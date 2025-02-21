import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import Select from "react-select";
import Switch from "react-switch";
import { QrReader } from "react-qr-reader";

const FormularioQR = () => {
  const { control, register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [scanning, setScanning] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const dataToSend = {
        ...data,
        sexo: data.sexo?.value,
        edad: data.edad?.value,
        escolaridad: data.escolaridad?.value,
      };

      console.log("Datos enviados al servidor:", dataToSend);

      const response = await fetch("https://sondeo-estadistico-2025-back.onrender.com/api/sondeos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        toast.success("Datos enviados correctamente", { style: { backgroundColor: "#b91c1c", color: "#fff" } });
        setTimeout(() => window.location.reload(), 1000);
      } else {
        toast.error("Error al enviar los datos. Intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      toast.error("Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  const handleScan = (data) => {
    if (data) {
      try {
        const parsedData = JSON.parse(data); // Suponiendo que el QR contiene JSON
        setValue("curp", parsedData.curp || "");
        setValue("nombre", parsedData.nombre || "");
        setValue("fechaNacimiento", parsedData.fechaNacimiento || "");
        toast.success("CURP escaneado correctamente");
        setScanning(false);
      } catch (error) {
        toast.error("Error al leer el QR");
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
    toast.error("Error al acceder a la cámara");
  };

  return (
    <div className="min-h-screen bg-cover bg-center p-6" style={{ backgroundImage: "url('/fondo-morena-1.jpg')" }}>
      <div className="bg-white max-w-3xl mx-auto p-6 rounded-lg shadow-lg shadow-gray-600">
        <h1 className="text-2xl font-bold text-red-900 mb-6 text-center border-b-2">FORMULARIO QR</h1>
        
        {/* Escáner QR */}
        <div className="mb-6 text-center">
          <button onClick={() => setScanning(!scanning)} className="bg-red-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700">
            {scanning ? "Cerrar Cámara" : "Escanear QR"}
          </button>
          {scanning && (
            <div className="mt-4 border border-gray-300 p-2">
              <QrReader
                constraints={{ facingMode: "environment" }}
                onResult={handleScan}
                onError={handleError}
                style={{ width: "100%" }}
              />
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Datos capturados del QR */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">CURP:</label>
            <input type="text" {...register("curp", { required: true })} className="w-full border px-3 py-2 rounded-md" />
            {errors.curp && <p className="text-red-600">Este campo es obligatorio.</p>}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Nombre Completo:</label>
            <input type="text" {...register("nombre", { required: true })} className="w-full border px-3 py-2 rounded-md" />
            {errors.nombre && <p className="text-red-600">Este campo es obligatorio.</p>}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Fecha de Nacimiento:</label>
            <input type="date" {...register("fechaNacimiento", { required: true })} className="w-full border px-3 py-2 rounded-md" />
            {errors.fechaNacimiento && <p className="text-red-600">Este campo es obligatorio.</p>}
          </div>

          {/* Datos adicionales */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Teléfono:</label>
            <input type="tel" {...register("telefono", { required: true })} className="w-full border px-3 py-2 rounded-md" />
            {errors.telefono && <p className="text-red-600">Este campo es obligatorio.</p>}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Correo Electrónico:</label>
            <input type="email" {...register("correo", { required: true })} className="w-full border px-3 py-2 rounded-md" />
            {errors.correo && <p className="text-red-600">Este campo es obligatorio.</p>}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Coto del INE:</label>
            <input type="text" {...register("cotoINE", { required: true })} className="w-full border px-3 py-2 rounded-md" />
            {errors.cotoINE && <p className="text-red-600">Este campo es obligatorio.</p>}
          </div>

          {/* Botón de enviar */}
          <div className="text-center">
            <button type="submit" className="bg-red-900 text-white px-8 py-6 rounded-lg font-bold hover:bg-red-700 flex items-center justify-center gap-2" disabled={loading}>
              {loading && (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8H4z"></path>
                </svg>
              )}
              {loading ? "Enviando..." : "Enviar"}
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default FormularioQR;
