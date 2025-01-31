import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import Select from "react-select";
import { secciones } from './secciones'; // Ajusta la ruta según tu estructura de carpetas

const PreSondeoDos = () => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Extraer solo el 'value' de los campos Select
      const formData = {
        seccionElectoral: data.seccionElectoral?.value, // Obtener solo el 'value' de seccionElectoral
        sexo: data.sexo?.value, // Obtener solo el 'value' de sexo
        escolaridad: data.escolaridad?.value, // Obtener solo el 'value' de escolaridad
        edad: data.edad, // Edad es un campo numérico, no se necesita transformación
      };

      console.log('Datos enviados al servidor:', formData);  // Imprime los datos enviados al servidor

      const response = await fetch('http://localhost:5001/api/sondeos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Todos los datos fueron enviados correctamente", {
          style: { backgroundColor: "#b91c1c", color: "#fff" },
          autoClose: 5000, // La alerta durará 5 segundos en pantalla
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000); // Recarga después de 1 segundo para que el usuario vea el mensaje
      } else {
        toast.error("Hubo un error al enviar los datos. Intenta nuevamente.", {
          style: { backgroundColor: "#b91c1c", color: "#fff" },
        });
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
      toast.error("Hubo un error al conectar con el servidor.", {
        style: { backgroundColor: "#b91c1c", color: "#fff" },
      });
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6"
      style={{ backgroundImage: "url('/fondo-morena-1.jpg')" }}
    >
      <div className="bg-white max-w-3xl mx-auto p-6 rounded-lg shadow-lg shadow-gray-600">
        <h1 className="text-2xl font-bold text-red-900 mb-6 text-center border-b-2">
          PRE-SONDEO ESTADÍSTICO
        </h1>
        <p className="text-gray-700 mb-4 text-justify">
          Este sondeo tiene como objetivo recabar información valiosa para
          mejorar los servicios públicos y las políticas de gobierno. Tus
          respuestas ayudarán a crear un futuro más inclusivo y eficaz para todos
          los ciudadanos.
        </p>
        <p className="text-gray-700 mb-4 font-semibold italic text-sm text-center">
          La participación es completamente anónima y voluntaria.
          Agradecemos tu tiempo y colaboración.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Sección 1: Datos Personales */}
          <div className="mb-8 border-t-2 border-red-900">
            <h2 className="text-xl font-semibold text-red-900 mb-4">
              1. Datos Personales
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Sección Electoral:</label>
              <Controller
                name="seccionElectoral"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={secciones.map((seccion) => ({
                      value: seccion,
                      label: `${seccion}`,
                    }))}
                  />
                )}
              />
              {errors.seccionElectoral && (
                <p className="text-red-600">Este campo es obligatorio.</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Sexo:</label>
              <Controller
                name="sexo"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "Masculino", label: "Masculino" },
                      { value: "Femenino", label: "Femenino" },
                      { value: "Ninguno", label: "Ninguno" },
                    ]}
                  />
                )}
              />
              {errors.sexo && <p className="text-red-600">Este campo es obligatorio.</p>}
            </div>
            <div className="mb-4">
            <label className="block text-gray-700 mb-2">Edad:</label>
            <input
                {...register("edad", { required: true })}  // Validación solo de 'required'
                className="w-full border border-gray-300 rounded-lg p-2"
            />
            {errors.edad && <p className="text-red-600">Este campo es obligatorio.</p>}
            </div>


            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Escolaridad:</label>
              <Controller
                name="escolaridad"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "Primaria", label: "Primaria" },
                      { value: "Secundaria", label: "Secundaria" },
                      { value: "Preparatoria", label: "Preparatoria" },
                      { value: "Licenciatura", label: "Licenciatura" },
                      { value: "Posgrado", label: "Posgrado" },
                    ]}
                  />
                )}
              />
              {errors.escolaridad && (
                <p className="text-red-600">Este campo es obligatorio.</p>
              )}
            </div>
          </div>

          {/* Botón de enviar */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-red-900 text-white py-2 px-6 rounded-lg font-semibold"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default PreSondeoDos;
