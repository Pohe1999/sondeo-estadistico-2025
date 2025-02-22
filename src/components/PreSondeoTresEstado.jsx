import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import Select from "react-select";
import Switch from "react-switch";
import { secciones } from './secciones';


{/* Sondeo de Estado de mexico version 2 */}
const PreSondeoTresEstado = () => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();


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
          PRE-SONDEO ESTADÍSTICO ESTADO DE MEXICO
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
              <label className="block text-gray-700 mb-2">Genero:</label>
              <Controller
                name="genero"
                control={control}
                rules={{ required: true }}
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
              {errors.genero && <p className="text-red-600">Este campo es obligatorio.</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Edad:</label>
              <input
                type="text"
                {...register("edad")}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
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
                      { value: "maestria", label: "Maestria" },
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

          {/* Sección: Ubicacion territorial */}
          <div className="mb-8 border-t-2 border-red-900">
            <h2 className="text-xl font-semibold text-red-900 mb-4">
              2. Ubicación territorial
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Sección donde se levanta la encuesta:</label>
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
              <label className="block text-gray-700 mb-2">¿Conoces el número de la sección donde votas?</label>
              <Controller
                name="conoceLaSeccion"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "si", label: "Si" },
                      { value: "no", label: "No" },
                      { value: "No contesto", label: "No contestó" },
                    ]}
                  />
                )}
              />
              {errors.conoceLaSeccion && (
                <p className="text-red-600">Este campo es obligatorio.</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">¿Votas en la sección dónde vives?</label>
              <Controller
                name="votaDondeVive"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "si", label: "Si" },
                      { value: "no", label: "No" },
                      { value: "No contesto", label: "No contestó" },
                    ]}
                  />
                )}
              />
              {errors.votaDondeVive && (
                <p className="text-red-600">Este campo es obligatorio.</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">¿En su opinión se considera un votante habitual?</label>
              <Controller
                name="votanteRegular"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "si", label: "Si" },
                      { value: "no", label: "No" },
                      { value: "No contesto", label: "No contestó" },
                    ]}
                  />
                )}
              />
              {errors.votanteRegular && (
                <p className="text-red-600">Este campo es obligatorio.</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">¿Votó en el pasado proceso electoral 2024?</label>
              <Controller
                name="VotoParaPresidencia"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "si", label: "Si" },
                      { value: "no", label: "No" },
                      { value: "no contesto", label: "No contesto" },
                    ]}
                  />
                )}
              />
              {errors.VotoParaPresidencia && (
                <p className="text-red-600">Este campo es obligatorio.</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">¿Por cuál partido político votó para Presidente Municipal en el 2024?</label>
              <Controller
                name="votoMunicipal"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "pan", label: "PAN" },
                      { value: "pri", label: "PRI" },
                      { value: "prd", label: "PRD" },
                      { value: "pvem", label: "PVEM" },
                      { value: "morena", label: "MORENA" },
                      { value: "mc", label: "MC" },
                      { value: "otro", label: "OTRO" }
                    ]}
                  />
                )}
              />
              {errors.votoMunicipal && (
                <p className="text-red-600">Este campo es obligatorio.</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">¿Por cuál partido político votó para Diputado federal en el 2024?</label>
              <Controller
                name="votoFederal"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "pan", label: "PAN" },
                      { value: "pri", label: "PRI" },
                      { value: "prd", label: "PRD" },
                      { value: "pvem", label: "PVEM" },
                      { value: "morena", label: "MORENA" },
                      { value: "mc", label: "MC" },
                      { value: "otro", label: "OTRO" }
                    ]}
                  />
                )}
              />
              {errors.votoFederal && (
                <p className="text-red-600">Este campo es obligatorio.</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">¿Por cuál partido político votó para Senadores en el 2024?</label>
              <Controller
                name="votoSenador"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "pan", label: "PAN" },
                      { value: "pri", label: "PRI" },
                      { value: "prd", label: "PRD" },
                      { value: "pvem", label: "PVEM" },
                      { value: "morena", label: "MORENA" },
                      { value: "mc", label: "MC" },
                      { value: "otro", label: "OTRO" }
                    ]}
                  />
                )}
              />
              {errors.votoSenador && (
                <p className="text-red-600">Este campo es obligatorio.</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">¿Qué tan satisfecho esta con el resultado de su voto?</label>
              <Controller
                name="satisfaccionVoto"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "muySatisfecho", label: "Muy satisfecho" },
                      { value: "pocoSatisfecho", label: "Poco satisfecho" },
                      { value: "nadaSatisfecho", label: "Nada satisfecho" },
                    ]}
                  />
                )}
              />
              {errors.satisfaccionVoto && (
                <p className="text-red-600">Este campo es obligatorio.</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">¿De las siguientes actividades, cuales considera que sean las principales funciones de una senadora o senador de la República?</label>
              <Controller
                name="funcionesDelSenador"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "Impulsar leyes en beneficio de los habitantes del Estado de México", label: "Impulsar leyes en beneficio de los habitantes del Estado de México" },
                      { value: "Gestionar apoyos sociales y obras para el Estado y sus municipios", label: "Gestionar apoyos sociales y obras para el Estado y sus municipios" },
                      { value: "noSabe", label: "No sabe / No contesto" }
                    ]}
                  />
                )}
              />
              {errors.funcionesDelSenador && (
                <p className="text-red-600">Este campo es obligatorio.</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">¿Conoce o ha escuchado a la Senadora Mariela Gutiérrez Escalante?</label>
              <label className="text-gray-800 text-sm italic">Califica del 1 al 10, donde 1 no la conozco y 10 la conozco mucho</label>
              <Controller
                name="conocimientoMG"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "1", label: "1" },
                      { value: "2", label: "2" },
                      { value: "3", label: "3" },
                      { value: "4", label: "4" },
                      { value: "5", label: "5" },
                      { value: "6", label: "6" },
                      { value: "7", label: "7" },
                      { value: "8", label: "8" },
                      { value: "9", label: "9" },
                      { value: "10", label: "10" }
                    ]}
                  />
                )}
              />
              {errors.funcionesDelSenador && (
                <p className="text-red-600">Este campo es obligatorio.</p>
              )}
            </div>
          </div>
          
          {/* Sección: Posicionamiento MG */}
          <div className="mb-8 border-t-2 border-red-900">
            <h2 className="text-xl font-semibold text-red-900 mb-4">
              3. Posicionamiento MG
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">¿A través de que medio o red social ha escuchado de la Senadora Mariela Gutiérrez Escalante?</label>
              <Controller
                name="medioDeConocimientoMG"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "radio", label: "Radio" },
                      { value: "television", label: "Televisión" },
                      { value: "facebook", label: "Facebook" },
                      { value: "x(antes twitter)", label: "X (antes Twitter)" },
                      { value: "tiktok", label: "Tik Tok" },
                      { value: "instagram", label: "Instagram" },
                      { value: "whatsapp", label: "Whats App" },
                      { value: "ninguno", label: "Ninguno" },
                      { value: "no sabe", label: "No sabe" }
                    ]}
                  />
                )}
              />
              {errors.medioDeConocimientoMG && (
                <p className="text-red-600">Este campo es obligatorio.</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                ¿Le gustaría recibir información de las actividades de la Senadora Mariela Gutiérrez Escalante?
              </label>
              <Controller
                name="recibirInfoDeMG"
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
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                ¿Sabía usted que Mariela Gutiérrez Escalante se consideró la mejor presidenta municipal del país?              </label>
              <Controller
                name="mejorPresidentaMG"
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
          </div>

          {/* Sección: Deteccion de problematicas */}
          <div className="mb-8 border-t-2 border-red-900">
            <h2 className="text-xl font-semibold text-red-900 mb-4">
              Detección de Problemáticas
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                En su opinión ¿Cuál es principal problema en su vida cotidiana?
              </label>
              <Controller
                name="problemaCotidiano"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "educacion", label: "Educación" },
                      { value: "empleo", label: "Empleo" },
                      { value: "economia familiar", label: "Economía familiar" },
                      { value: "seguridad", label: "Seguridad" },
                      { value: "movilidad", label: "Movilidad" },
                      { value: "salul", label: "Salud" },
                      { value: "otro", label: "Mayor participación ciudadana en coordinación con las autoridades de gobierno" }
                    ]}
                  />
                )}
              />
              {errors.problemaCotidiano && (
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
                ¿Qué nivel de gobierno considera que se ocupa más en atender las necesidades de su comunidad?
              </label>
              <Controller
                name="gobiernoEngargadoDeAtender"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "municipal", label: "Municipal" },
                      { value: "estatal", label: "Estatal" },
                      { value: "federal", label: "Federal" },
                      { value: "ninguno", label: "Ninguno" }
                    ]}
                  />
                )}
              />
              {errors.gobiernoEngargadoDeAtender && (
                <p className="text-red-600">Este campo es obligatorio.</p>
              )}
            </div>
          </div>

          {/* Sección 5: Recaudación*/}
          <div className="mb-8 border-t-2 border-red-900">
            <h2 className="text-xl font-semibold text-red-900 mb-4">
              5. Recaudación
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                ¿Usted conoce los beneficios de pagar impuestos?
              </label>
              <Controller
                name="conoceBeneficiosImpuestos"
                control={control}
                rules={{ required: true }}
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
              {errors.conoceBeneficiosImpuestos && (
                <p className="text-red-600">Este campo es obligatorio.</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                ¿Usted conoce las campañas de descuentos y/o condonación de impuestos, multas o recargos?
              </label>
              <Controller
                name="conoceCampanasDescuentos"
                control={control}
                rules={{required: true}}
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
              {errors.conoceCampanasDescuentos && (
                <p className="text-red-600">Este campo es obligatorio.</p>
              )}
            </div>
          </div>

          {/* Sección: Obra Pública y Ciudadanía */}
          <div className="mb-8 border-t-2 border-red-900">
            <h2 className="text-xl font-semibold text-red-900 mb-4">
              Obra Pública y Ciudadanía
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
              ¿Conoce alguna obra pública en su comunidad o municipio que haya influido significativamente en su calidad de vida?
              </label>
              <Controller
                name="conoceObraPublica"
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
            {watch("conoceObraPublica") && (
              <div>
              <div className="mb-4">
              <label className="block text-gray-700 mb-2">¿Cuál?</label>
              <input
                  type="text"
                  {...register("conoceObraPublicaCual")}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              {errors.conoceObraPublica && (
                <p className="text-red-600">Este campo es obligatorio.</p>
              )}
            </div>
            </div>
            )}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Respecto a las vialidades que utiliza diariamente ¿Considera que se encuentran en malas condiciones? (pavimentadas o bacheo)</label>
              <Controller
                name="VialidadesEnMalEstado"
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
            {watch("VialidadesEnMalEstado") && (
              <div>
              <div className="mb-4">
              <label className="block text-gray-700 mb-2">¿Puedes decirnos Cuál?</label>
              <input
                  type="text"
                  {...register("VialidadesEnMalEstadoCual")}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              {errors.conoceObraPublica && (
                <p className="text-red-600">Este campo es obligatorio.</p>
              )}
            </div>
            </div>
            )}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                ¿Cómo calificarías, el nivel de alumbrado público en tu colonia?
              </label>
              <Controller
                name="alumbradoPublico"
                control={control}
                rules={{required: true}}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "bueno", label: "Bueno" },
                      { value: "regular", label: "Regular" },
                      { value: "malo", label: "Malo" },
                      { value: "no sabe", label: "No sabe / No contesto" },

                    ]}
                  />
                )}
              />
              {errors.alumbradoPublico && (
                <p className="text-red-600">Este campo es obligatorio.</p>
              )}
            </div>
          </div>

          {/* Sección: Servicios publicos */}
          <div className="mb-8 border-t-2 border-red-900">
            <h2 className="text-xl font-semibold text-red-900 mb-4">
              7. Servicios Públicos
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                ¿Habitualmente se realiza la recolección de basura orgánica e inorgánica en tu colonia?
              </label>
              <Controller
                name="recoleccionBasura"
                control={control}
                rules={{required: true}}
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
              {errors.recoleccionBasura && (
                <p className="text-red-600">Este campo es obligatorio.</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                ¿Los mercados municipales a los que acude son espacios limpios, que cuentan con las medidas de higiene adecuadas?
              </label>
              <Controller
                name="mercadosMunicipales"
                control={control}
                rules={{required: true}}
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
              {errors.mercadosMunicipales && (
                <p className="text-red-600">Este campo es obligatorio.</p>
              )}
            </div>
          </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                ¿Cómo calificaría su servicio de agua?
              </label>
              <Controller
                name="calificacionAgua"
                control={control}
                rules={{required: true}}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "Bueno", label: "Bueno" },
                      { value: "Regular", label: "Regular" },
                      { value: "Malo", label: "Malo" },
                      { value: "MuyMalo", label: "Muy malo" }
                    ]}
                  />
                )}
              />
              {errors.calificacionAgua && (
                <p className="text-red-600">Este campo es obligatorio.</p>
              )}
            </div>
          {/* Sección 8: Cultura */}
          <div className="mb-8 border-t-2 border-red-900">
            <h2 className="text-xl font-semibold text-red-900 mb-4">
              8. Cultura
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                ¿Existen dinámicas de actividades culturales por parte del gobierno, municipal, estatal y federal, en su colonia?
              </label>
              <Controller
                name="muestrasCulturales"
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
          </div>

          {/* Sección 9: Deporte */}
          <div className="mb-8 border-t-2 border-red-900">
            <h2 className="text-xl font-semibold text-red-900 mb-4">
              9. Deporte
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                ¿Existen dinámicas de actividades culturales por parte del gobierno, municipal, estatal y federal, en su colonia?
              </label>
              <Controller
                name="eventosDeportivos"
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
          </div>

          {/* Sección: Evaluacion del desempeño */}
          <div className="mb-8 border-t-2 border-red-900">
            <h2 className="text-xl font-semibold text-red-900 mb-4">
              10. Evaluacíon del desempeño
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                ¿Cómo calificaría el inicio de gobierno de la presidenta Claudia Sheinbaum Pardo?              </label>
              <Controller
                name="gobiernoClaudia"
                control={control}
                rules={{required: true}}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "bueno", label: "Bueno" },
                      { value: "regular", label: "Regular" },
                      { value: "malo", label: "Malo" },
                      { value: "noSabe", label: "No sabe / No contesto" }
                    ]}
                  />
                )}
              />
              {errors.gobiernoClaudia && (
                <p className="text-red-600">Este campo es obligatorio.</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                ¿Cómo calificaría el desempeño de la Gobernadora Delfina Gómez Álvarez, en el Estado de México?              
              </label>
              <Controller
                name="gobiernoDelfina"
                control={control}
                rules={{required: true}}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "bueno", label: "Bueno" },
                      { value: "regular", label: "Regular" },
                      { value: "malo", label: "Malo" },
                      { value: "noSabe", label: "No sabe / No contesto" }
                    ]}
                  />
                )}
              />
              {errors.gobiernoDelfina && (
                <p className="text-red-600">Este campo es obligatorio.</p>
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

export default PreSondeoTresEstado;