import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import Select from "react-select";
import Switch from "react-switch";
import { secciones } from './secciones';

const PreSondeoEstadistico = () => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const dataToSend = Object.keys(data).reduce((acc, key) => {
        if (typeof data[key] === 'object' && data[key] !== null && data[key].hasOwnProperty('value')) {
          acc[key] = data[key].value;
        } else if (typeof data[key] === 'boolean') {
          acc[key] = data[key];
        } else {
          acc[key] = data[key];
        }
        return acc;
      }, {});

      console.log('Datos enviados al servidor:', dataToSend);

      const response = await fetch('http://localhost:5001/api/sondeos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        toast.success("Datos enviados correctamente", {
          style: { backgroundColor: "#b91c1c", color: "#fff" },
          autoClose: 5000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error("Error al enviar los datos. Intenta nuevamente.", {
          style: { backgroundColor: "#b91c1c", color: "#fff" },
        });
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
      toast.error("Error al conectar con el servidor.", {
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
                type="number"
                {...register("edad", { required: true, min: 1, max: 99 })}
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

          {/* Sección 2: Desarrollo Social */}
          <div className="mb-8 border-t-2 border-red-900">
            <h2 className="text-xl font-semibold text-red-900 mb-4">
              2. Desarrollo Social
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                ¿Usted es beneficiario de algún programa social?
              </label>
              <Controller
                name="beneficiario"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center gap-4">
                    <Switch
                      onChange={field.onChange}
                      checked={field.value}
                      onColor="#b91c1c"
                    />
                    <span>{field.value ? "Sí" : "No"}</span>
                  </div>
                )}
              />
            </div>
            {watch("beneficiario") && (
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">¿Cuál?</label>
                <input
                  type="text"
                  {...register("programaSocial")}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
            )}
          </div>

          {/* Sección 3: Seguridad Pública */}
          <div className="mb-8 border-t-2 border-red-900">
            <h2 className="text-xl font-semibold text-red-900 mb-4">
              3. Seguridad Pública
            </h2>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                ¿Cuál considera que es el principal problema de seguridad en su colonia?
              </label>
              <Controller
                name="problemaSeguridad"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "Robos en via publica", label: "Robos en vía pública y transporte público" },
                      { value: "Robos casa", label: "Robos a casa habitación" },
                      { value: "Vandalismo y drogas", label: "Vandalismo y Drogadicción" },
                    ]}
                  />
                )}
              />
              {errors.problemaSeguridad && (
                <p className="text-red-600">Este campo es obligatorio.</p>
              )}
            </div>

            {/* Aquí agregamos un input para el campo "Otro" debajo de las opciones */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Otro</label>
              <input
                type="text"
                {...register("problemaSeguridadOtro")}
                className="w-full border-2 border-gray-300 rounded-lg p-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                ¿Qué acciones usted cree que podrían mejorar la seguridad?
              </label>
              <Controller
                name="accionesSeguridad"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "Mejor iluminacion", label: "Mejor iluminación en calles y avenidas" },
                      { value: "Videovigilancia", label: "Video-vigilancia con cámaras de seguridad" },
                      { value: "Presencia policia", label: "Mayor presencia policial" },
                      { value: "Mantenimiento", label: "Limpieza y mantenimiento de espacios públicos" },
                      { value: "Participacion", label: "Mayor participación ciudadana" },
                    ]}
                  />
                )}
              />
              {errors.accionesSeguridad && (
                <p className="text-red-600">Este campo es obligatorio.</p>
              )}
            </div>

            {/* Aquí agregamos un input para el campo "Otro" debajo de las opciones */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Otro</label>
              <input
                type="text"
                {...register("accionesSeguridadOtro")}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                ¿Estaría dispuesto(a) a participar en actividades para mejorar la seguridad?
              </label>
              <Controller
                name="participacionSeguridad"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "Si", label: "Sí" },
                      { value: "No", label: "No" },
                      { value: "Tal vez", label: "Tal vez" },
                    ]}
                  />
                )}
              />
            </div>
          </div>


          {/* Sección 4: Conocimiento sobre Impuestos */}
          <div className="mb-8 border-t-2 border-red-900">
            <h2 className="text-xl font-semibold text-red-900 mb-4">
              4. Conocimiento sobre Impuestos
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                ¿Usted conoce los beneficios de pagar impuestos?
              </label>
              <Controller
                name="conoceBeneficiosImpuestos"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "Si", label: "Sí" },
                      { value: "No", label: "No" },
                    ]}
                  />
                )}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                ¿Usted conoce las campañas de descuentos y/o condonación de impuestos, multas o recargos?
              </label>
              <Controller
                name="conoceCampanasDescuentos"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "Si", label: "Sí" },
                      { value: "No", label: "No" },
                    ]}
                  />
                )}
              />
            </div>
          </div>

          {/* Sección 5: Deporte */}
          <div className="mb-8 border-t-2 border-red-900">
            <h2 className="text-xl font-semibold text-red-900 mb-4">
              5. Deporte
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                ¿En su colonia se organizan eventos deportivos recurrentemente?
              </label>
              <Controller
                name="eventosDeportivos"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "Si", label: "Sí" },
                      { value: "No", label: "No" },
                    ]}
                  />
                )}
              />
            </div>
          </div>

          {/* Sección 6: Obra Pública y Ciudadanía */}
          <div className="mb-8 border-t-2 border-red-900">
            <h2 className="text-xl font-semibold text-red-900 mb-4">
              6. Obra Pública y Ciudadanía
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                ¿Conoce alguna obra pública que haya influido significativamente en su calidad de vida?
              </label>
              <Controller
                name="obraPublicaInfluyente"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "Si", label: "Sí" },
                      { value: "No", label: "No" },
                    ]}
                  />
                )}
              />
            </div>
            {watch("obraPublicaInfluyente") === "Si" && (
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">¿Cuál?</label>
                <input
                  type="text"
                  {...register("obraPublica")}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
            )}

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Respecto a las vialidades que utilizas diariamente, ¿consideras que se encuentran en buenas condiciones?
              </label>
              <Controller
                name="vialidades"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "Si", label: "Sí" },
                      { value: "No", label: "No" },
                    ]}
                  />
                )}
              />
            </div>
            {watch("vialidades") === "No" && (
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">¿Cuál?</label>
                <input
                  type="text"
                  {...register("vialidadesComentario")}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
            )}

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                En tu colonia, ¿hay espacios que no cuenten con luminarias?
              </label>
              <Controller
                name="espaciosSinLuminarias"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "Si", label: "Sí" },
                      { value: "No", label: "No" },
                    ]}
                  />
                )}
              />
            </div>
            {watch("espaciosSinLuminarias") === "Si" && (
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">¿Cuáles?</label>
                <input
                  type="text"
                  {...register("espaciosSinLuminariasComentario")}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
            )}
          </div>

          {/* Sección 7: Ecología */}
          <div className="mb-8 border-t-2 border-red-900">
            <h2 className="text-xl font-semibold text-red-900 mb-4">
              7. Ecología
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                ¿Habitualmente se realiza la recolección de basura orgánica e inorgánica en tu colonia?
              </label>
              <Controller
                name="recoleccionBasura"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "Si", label: "Sí" },
                      { value: "No", label: "No" },
                    ]}
                  />
                )}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                ¿Consideras que los mercados municipales son espacios limpios y con las medidas de higiene adecuadas?
              </label>
              <Controller
                name="mercadosMunicipales"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "Si", label: "Sí" },
                      { value: "No", label: "No" },
                    ]}
                  />
                )}
              />
            </div>
          </div>

          {/* Sección 8: Agua */}
          <div className="mb-8 border-t-2 border-red-900">
            <h2 className="text-xl font-semibold text-red-900 mb-4">
              8. Agua
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                ¿Cómo calificaría su servicio de agua?
              </label>
              <Controller
                name="calificacionAgua"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "Bueno", label: "Bueno" },
                      { value: "Regular", label: "Regular" },
                      { value: "Malo", label: "Malo" },
                    ]}
                  />
                )}
              />
            </div>
          </div>

          {/* Sección 9: Cultura */}
          <div className="mb-8 border-t-2 border-red-900">
            <h2 className="text-xl font-semibold text-red-900 mb-4">
              9. Cultura
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                ¿En tu colonia se han presentado muestras culturales?
              </label>
              <Controller
                name="muestrasCulturales"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "Si", label: "Sí" },
                      { value: "No", label: "No" },
                    ]}
                  />
                )}
              />
            </div>
          </div>

          {/* Sección 10: Puerta Violeta */}
          <div className="mb-8 border-t-2 border-red-900">
            <h2 className="text-xl font-semibold text-red-900 mb-4">
              10. Puerta Violeta
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                ¿Sabía usted que en cada instalación del gobierno municipal funciona un programa denominado "Puerta Violeta"?
              </label>
              <Controller
                name="puertaVioleta"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "Si", label: "Sí" },
                      { value: "No", label: "No" },
                    ]}
                  />
                )}
              />
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

export default PreSondeoEstadistico;
