import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import Select from "react-select";
import Switch from "react-switch";
import { secciones } from './secciones';

{/* Sondeo del Tecamac */}
const PreSondeoEstadistico = () => {
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
          {/* Sección 1: Datos de segmentacion */}
          <div className="mb-8 border-t-2 border-red-900">
            <h2 className="text-xl font-semibold text-red-900 mb-4">
              1. Datos De segmentacion
            </h2>
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
                      { value: "Otro", label: "Otro" },
                    ]}
                  />
                )}
              />
              {errors.sexo && <p className="text-red-600">Este campo es obligatorio.</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Edad:</label>
              <Controller
                name="edad"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "18-25", label: "18-25 años" },
                      { value: "26-35", label: "26-35 años" },
                      { value: "31-35", label: "31-35 años" },
                      { value: "36-45", label: "36-45 años" },
                      { value: "46-55", label: "46-55 años" },
                      { value: "56-65", label: "56-65 años" }
                    ]}
                  />
                )}
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
              <label className="block text-gray-700 mb-2">¿Votaste en el pasado proceso electoral para elegir Presidente Municipal de Tecámac?</label>
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
                      { value: "No contesto", label: "No contestó" },
                    ]}
                  />
                )}
              />
              {errors.VotoParaPresidencia && (
                <p className="text-red-600">Este campo es obligatorio.</p>
              )}
            </div>
          </div>
          

          {/* Sección 3: Desarrollo Social */}
          <div className="mb-8 border-t-2 border-red-900">
            <h2 className="text-xl font-semibold text-red-900 mb-4">
              3. Desarrollo Social
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
              <div>
              <div className="mb-4">
              <label className="block text-gray-700 mb-2">¿Cuál es la instancia de gobierno de la cual recibe su apoyo?</label>
              <Controller
                name="instanciaDelBeneficio"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "municipal", label: "Municipal" },
                      { value: "estatal", label: "Estatal" },
                      { value: "federal", label: "Federal" },
                    ]}
                  />
                )}
              />
              {errors.instanciaDelBeneficio && (
                <p className="text-red-600">Este campo es obligatorio.</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">¿Qué tan satisfecho esta con el apoyo que recibe?</label>
              <Controller
                name="satisfaccionDelBeneficio"
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
              {errors.satisfaccionDelBeneficio && (
                <p className="text-red-600">Este campo es obligatorio.</p>
              )}
            </div>
            </div>
            )}
          </div>

          {/* Sección 4: Seguridad Pública */}
          <div className="mb-8 border-t-2 border-red-900">
            <h2 className="text-xl font-semibold text-red-900 mb-4">
              4. Percepción de la Seguridad Pública
            </h2>
            <h3 className="block text-gray-700 mb-2">
              En términos de delincuencia, ¿se siente seguro o inseguro?
            </h3>
            {[
              { name: "casa", label: "Su casa" },
              { name: "trabajo", label: "Su trabajo" },
              { name: "calle", label: "La calle" },
              { name: "escuela", label: "La escuela" },
              { name: "mercado", label: "El mercado" },
              { name: "centro_comercial", label: "El centro comercial" },
              { name: "banco", label: "El banco" },
              { name: "cajero", label: "El cajero automático en vía pública" },
              { name: "transporte", label: "El transporte público" },
              { name: "automovil", label: "El automóvil" },
              { name: "parque", label: "Parque o centro recreativo" },
            ].map((item) => (
              <div key={item.name} className="mb-4">
                <label className="block text-gray-700 mb-2 border-b border-red-900">{item.label}:</label>
                <Controller
                  name={item.name}
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={[
                        { value: "seguro", label: "Seguro (a)" },
                        { value: "inseguro", label: "Inseguro (a)" },
                        { value: "noAplica", label: "No aplica" },
                        { value: "noSabeNoContesto", label: "No contestó / No sabe" },
                      ]}
                    />
                  )}
                />
                {errors[item.name] && (
                  <p className="text-red-600">Este campo es obligatorio.</p>
                )}
              </div>
            ))}
            <h3 className="block text-gray-700 mb-2">
            ¿Sabe usted o ha escuchado si en los alrededores de su vivienda suceden
            o se dan las siguientes situaciones?
            </h3>
            {[
              { name: "consumoAlcohol", label: "Consumo de alcohol en la calle" },
              { name: "pandillas", label: "Pandillas y bandas violentas" },
              { name: "ventaIlegalAlcohol", label: "Existe venta ilegal de alcohol" },
              { name: "ventaPirateria", label: "Se venden productos piratas" },
              { name: "invasionPredios", label: "Hay invasión de predios o casas" },
              { name: "robosFrecuentes", label: "Existen robos o asaltos frecuentes" },
              { name: "ventaDroga", label: "Se vende droga" },
              { name: "disparosFrecuentes", label: "Ha habido disparos frecuentes" },
              { name: "secuestros", label: "Ha habido secuestros" },
              { name: "homicidios", label: "Ha habido homicidios" },
            ].map((item) => (
              <div key={item.name} className="mb-4">
                <label className="block text-gray-700 mb-2 border-b border-red-900">{item.label}:</label>
                <Controller
                  name={item.name}
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={[
                        { value: "si", label: "Sí" },
                        { value: "no", label: "No" },
                        { value: "noSabeNoContesto", label: "No contestó / No sabe" },
                      ]}
                    />
                  )}
                />
                {errors[item.name] && (
                  <p className="text-red-600">Este campo es obligatorio.</p>
                )}
              </div>
            ))}
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
                      { value: "Participacion", label: "Mayor participación ciudadana en coordinación con las autoridades de gobierno" },
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
                rules={{ required: true }}
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
              {errors.participacionSeguridad && (
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
                rules={{required: true}}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "si", label: "Sí" },
                      { value: "no", label: "No" },
                    ]}
                  />
                )}
              />
              {errors.obraPublicaInfluyente && (
                <p className="text-red-600">Este campo es obligatorio.</p>
              )}
            </div>
            {watch("obraPublicaInfluyente") === "Sí" && (
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
                Respecto a las vialidades que utilizas diariamente, ¿consideras que se encuentran en buenas condiciones(pavimentadas o bacheo)?
              </label>
              <Controller
                name="vialidades"
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
              {errors.vialidades && (
                <p className="text-red-600">Este campo es obligatorio.</p>
              )}
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
              {errors.espaciosSinLuminarias && (
                <p className="text-red-600">Este campo es obligatorio.</p>
              )}
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

          {/* Sección 7: Servicios publicos */}
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
                ¿Consideras que los mercados municipales son espacios limpios y con las medidas de higiene adecuadas?
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
              En tu colonia, ¿Existen dinámicas de actividades culturales por parte del gobierno,
              municipal, estatal y federal?
              </label>
              <Controller
                name="muestrasCulturales"
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
              {errors.muestrasCulturales && (
                <p className="text-red-600">Este campo es obligatorio.</p>
              )}
            </div>
          </div>

          {/* Sección 9: Deporte */}
          <div className="mb-8 border-t-2 border-red-900">
            <h2 className="text-xl font-semibold text-red-900 mb-4">
              9. Deporte
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                En su colonia, ¿Se organizan eventos deportivos recurrentemente?
              </label>
              <Controller
                name="eventosDeportivos"
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
              {errors.eventosDeportivos && (
                <p className="text-red-600">Este campo es obligatorio.</p>
              )}
            </div>
          </div>

          {/* Sección 10: Puerta Violeta */}
          <div className="mb-8 border-t-2 border-red-900">
            <h2 className="text-xl font-semibold text-red-900 mb-4">
              10. Puerta Violeta
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
              ¿Sabía usted que en cada instalación del gobierno municipal funciona con un programa denominado “Puerta Violeta”?
              </label>
              <Controller
                name="puertaVioleta"
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
              {errors.puertaVioleta && (
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

export default PreSondeoEstadistico;