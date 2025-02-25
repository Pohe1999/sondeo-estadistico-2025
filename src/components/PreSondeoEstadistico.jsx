import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import Select from "react-select";
import Switch from "react-switch";
import { secciones } from './secciones';


{/* Sondeo de Estado de mexico */}
const PreSondeoEstadistico = () => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      laEscuelaEstaEnTerritorioMunicipal: false,
      actualmenteTrabaja: false // Establece el valor por defecto como false
    },
  })


  const [loading, setLoading] = useState(false); // ⬅️ Estado para el spinner

  const onSubmit = async (data) => {
    setLoading(true); // ⬅️ Activar spinner antes de enviar

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

      const response = await fetch('https://sondeo-estadistico-2025-back.onrender.com/api/sondeos', {
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
    } finally {
      setLoading(false); // ⬅️ Desactivar spinner después de la respuesta
    }
  };
  
  
  return (
    <div
      className="min-h-screen bg-cover bg-center p-6"
      style={{ backgroundImage: "url('/fondo-morena-1.jpg')" }}
    >
      <div className="bg-white max-w-3xl mx-auto p-6 rounded-lg shadow-lg shadow-gray-600">
        <h1 className="text-2xl font-bold text-red-900 mb-6 text-center border-b-2">
          PRE-SONDEO ESTADÍSTICO ESTADO DE MEXICO MPG
        </h1>
        <p className="text-gray-700 mb-4 text-justify">
          Este sondeo tiene como objetivo recabar información valiosa para
          mejorar los servicios públicos y las políticas de gobierno Del estado de mexico. Tus
          respuestas ayudarán a crear un futuro más inclusivo y eficaz para todos
          los ciudadanos.
        </p>
        <p className="text-gray-700 mb-4 font-semibold italic text-sm text-center">
          La participación es completamente anónima y voluntaria.
          Agradecemos tu tiempo y colaboración.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Sección 1: Datos de segmentacion */}
          <div className="mb-8 border-t-2 border-red-900">
            <h2 className="text-xl font-semibold text-red-900 mb-4">
              1. Datos De segmentacion
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Género:</label>
              <Controller
                name="genero"
                control={control}
                rules={{ required: "El genero es obligatorio." }} // Mensaje de error personalizado
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "Masculino", label: "Masculino" },
                      { value: "Femenino", label: "Femenino" },
                      { value: "Otro", label: "Otro" },
                    ]}
                  />
                )}
              />
              {errors.genero && (
                <p className="text-red-600 text-sm">{errors.genero.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Edad:</label>
              <input
                type="number"
                {...register("edad", { required: "La edad es obligatoria." })}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              {errors.edad && (
                <p className="text-red-600 text-sm">{errors.edad.message}</p>
              )}
            </div>
          </div>

          {/* Sección: Ubicacion territorial */}
          <div className="mb-8 border-t-2 border-red-900">
            <h2 className="text-xl font-semibold text-red-900 mb-4">
              2. Ubicación territorial
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Sección:</label>
              <Controller
                name="seccionElectoral"
                control={control}
                rules={{ required: "La seccion es obligatoria." }}
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
                <p className="text-red-600 text-sm">{errors.seccionElectoral.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Localidad:</label>
              <input
                name="localidad"
                type="text"
                {...register("localidad", {required: "Localidad obligatoria."})}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              {errors.localidad && (
                <p className="text-red-600 text-sm">{errors.localidad.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Calle:</label>
              <input
                type="text"
                {...register("calle", {required: "Calle es obligatoria."})}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              {errors.calle && (
                <p className="text-red-600 text-sm">{errors.calle.message}</p>
              )}            
              </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">No. Ext:</label>
              <input
                type="number"
                {...register("numExterior", {required: "Numero exterior obligatorio."})}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              {errors.numExterior && (
                <p className="text-red-600 text-sm">{errors.numExterior.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">No. Int:</label>
              <input
                type="text"
                {...register("numInterior")}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Codigo Postal:</label>
              <input
                type="number"
                {...register("codigoPostal", {required: "Codigo postal obligatorio."})}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              {errors.codigoPostal && (
                <p className="text-red-600 text-sm">{errors.codigoPostal.message}</p>
              )}            
              </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Identifique tipo de Vivienda</label>
              <Controller
                name="tipoVivienda"
                control={control}
                rules={{ required: "El tipo de vivienda es obligatorio." }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "casaIndependiente", label: "Casa independiente" },
                      { value: "departamentoEnEdificio", label: "Departamento en edificio" },
                      { value: "viviendaEnCuartoDeAzotea", label: "Vivienda en cuarto de azotea" },
                      { value: "viviendaEnVecindad", label: "Vivienda en vecindad" },
                      { value: "localNoConstruidoParaHabitacion", label: "Local no construido para habitación" }
                    ]}
                  />
                )}
              />
              {errors.tipoVivienda && (
                <p className="text-red-600 text-sm">{errors.tipoVivienda.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">¿Cuántas personas viven normalmente en esta vivienda, contando a niñas y niños pequeños y a las personas adultas mayores?</label>
              <label className="block text-gray-700 mb-2 text-sm italic">Registre con número</label>
              <input
                type="number"
                {...register("numeroDeHabitantes", {required: "Campo obligatorio."})}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              {errors.numeroDeHabitantes && (
                <p className="text-red-600 text-sm">{errors.numeroDeHabitantes.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">¿Todas las personas que viven en esta vivienda comparten un mismo gasto para comer?</label>
              <Controller
                name="compartenMismoGasto"
                control={control}
                rules={{ required: "Campo Obligatorio." }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "si", label: "Si" },
                      { value: "no", label: "No" }
                    ]}
                  />
                )}
              />
              {errors.compartenMismoGasto && (
                <p className="text-red-600 text-sm">{errors.compartenMismoGasto.message}</p>
              )}
            </div>
          </div>
          
          {/* Sección: 3	Características Sociodemográficas */}
          <div className="mb-8 border-t-2 border-red-900">
            <h2 className="text-xl font-semibold text-red-900 mb-4">
              3. Características Sociodemográficas
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">¿Hasta qué año o grado aprobó en la escuela?</label>
              <Controller
                name="gradoDeEstudios"
                control={control}
                rules={{ required: "Campo obligatorio." }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "ninguno", label: "Ninguno" },
                      { value: "preescolar", label: "Preescolar" },
                      { value: "primaria", label: "Primaria" },
                      { value: "secundaria", label: "Secundaria" },
                      { value: "normalBasica", label: "Normal básica (con antecedente en secundaria)" },
                      { value: "Tecnica/Preparatoria", label: "Carrera técnica con preparatoria terminada" },
                      { value: "Licenciatura", label: "Licenciatura o profesional" },
                      { value: "maestriaDoctorado", label: "Maestría o doctorado" }
                    ]}
                  />
                )}
              />
              {errors.gradoDeEstudios && (
                <p className="text-red-600 text-sm">{errors.gradoDeEstudios.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                ¿La escuela que Asiste se encuentra dentro del territorio municipal?
              </label>
              <Controller
                name="laEscuelaEstaEnTerritorioMunicipal"
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
            {watch("laEscuelaEstaEnTerritorioMunicipal") && (
              <div>
              <div className="mb-4">
              <label className="block text-gray-700 mb-2">Mencione a la escuela a la que asiste:</label>
              <input
                  type="text"
                  {...register("nombreDeLaEscuela", {required: "Campo obligatorio."})}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              {errors.nombreDeLaEscuela && (
                <p className="text-red-600 text-sm">{errors.nombreDeLaEscuela.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Grado que cursa:</label>
              <input
                  type="text"
                  {...register("gradoQueCursa", {required: "Campo obligatorio."})}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              {errors.gradoQueCursa && (
                <p className="text-red-600 text-sm">{errors.gradoQueCursa.message}</p>
              )}
            </div>
            </div>
            )}
            <h2 className="text-xl font-semibold text-red-900 mb-4">
              Ocupación
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                ¿Actualmente trabaja?
              </label>
              <Controller
                name="actualmenteTrabaja"
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
            {watch("actualmenteTrabaja") && (
            <div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                ¿Cuál es su ocupación?
              </label>
              <Controller
                name="ocupacionActual"
                control={control}
                rules={{ required: "Campo obligatorio." }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "empleado", label: "Empleado" },
                      { value: "servidorPublico", label: "Servidor público" },
                      { value: "comerciante", label: "Comerciante" },
                      { value: "jornalero", label: "Jornalero" },
                      { value: "hogar", label: "Hogar" },
                      { value: "servicioDomestico", label: "Servicio doméstico " },
                      { value: "profesionistaInependiente", label: "Profesionista independiente" },
                      { value: "maestriaDoctorado", label: "Maestría o doctorado" }
                    ]}
                    value={field.value || null} // Asegura que el valor se maneje correctamente
                    onChange={(selectedOption) => field.onChange(selectedOption?.value)} // Solo guarda el valor, no el objeto entero
                  />
                )}
              />
              {errors.ocupacionActual && (
                <p className="text-red-600 text-sm">{errors.ocupacionActual.message}</p>
              )}
            </div>
            </div>
            )}
          </div>

          {/* Sección: Compromisos de campaña */}
          <div className="mb-8 border-t-2 border-red-900">
            <h2 className="text-xl font-semibold text-red-900 mb-4">
              Trámites y servicios(Movilidad)
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                ¿Cuál es el medio de transporte que más usas?
              </label>
              <Controller
                name="medioDeTransporte"
                control={control}
                rules={{ required: "Campo obligatorio." }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "autoPropio", label: "Auto Propio" },
                      { value: "transportePublico", label: "Transporte Público" }
                    ]}
                  />
                )}
              />
              {errors.medioDeTransporte && (
                <p className="text-red-600 text-sm">{errors.medioDeTransporte.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Con base al medio de transporte que utilizas, consideras que la movilidad (traslado/circulación) es
              </label>
              <Controller
                name="calidadDelTransportePublico"
                control={control}
                rules={{ required: "Campo obligatorio." }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "excelente", label: "Excelente, me traslado siempre con rapidez y seguridad" },
                      { value: "bueno", label: "Bueno, con regularidad mi traslado y seguridad" },
                      { value: "malo", label: "Malo, Casi nunca me traslado con rapidez y seguridad" }                    
                    ]}
                  />
                )}
              />
              {errors.calidadDelTransportePublico && (
                <p className="text-red-600 text-sm">{errors.calidadDelTransportePublico.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Según su experiencia en trasladarse, ¿Cuál considera el mayor problema que afecta la movilidad en el municipio?             
              </label>
              <Controller
                name="mayorProblematicaEnMovilidad"
                control={control}
                rules={{ required: "Campo obligatorio." }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "callesAvenidasEnMalEstadp", label: "Calles y avenidas en mal estado" },
                      { value: "faltaDelPersonalDeApoyo", label: "Falta de personal que apoye la movilidad en puntos críticos" },
                      { value: "faltaDeSemaforosEnCrucesEstrategicos", label: "La falta de semáforos en cruces estratégicos" },
                      { value: "faltaDeViasParaCiclistas", label: "La falta de Vías confinadas para ciclistas" },
                      { value: "faltaDeParaderosEstrategicosDeTransporte", label: "La falta de Paraderos específicos para el transporte de pasajeros" },
                      { value: "faltaDeSenderosSegurosParaPeatones", label: "La falta de Senderos seguros para peatones" }
                    ]}
                  />
                )}
              />
              {errors.mayorProblematicaEnMovilidad && (
                <p className="text-red-600 text-sm">{errors.mayorProblematicaEnMovilidad.message}</p>
              )}
            </div>
          </div>
          {/* Botón de enviar */}
          <div className="text-center">
          <button
              type="submit"
              className="bg-red-900 text-white px-8 py-6 rounded-lg font-bold hover:bg-red-700 flex items-center justify-center gap-2"
              disabled={loading} // ⬅️ Deshabilitar botón mientras carga
            >
              {loading && (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8H4z"
                  ></path>
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

export default PreSondeoEstadistico;