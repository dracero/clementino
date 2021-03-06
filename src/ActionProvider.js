// ActionProvider starter code
class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }
  greet(respuesta) {
    console.log(respuesta);
    const intents = {
      mensajes: "Ponerse en contacto",
      cambios: "Pagina de cátedra",
      apuntes:
        "Es necesario cambiar a FIUBA la institución en tu perfil. Luego",
      ejercicios: "La Guía de problemas",
      examenes: "Tanto la constancia de parcial como la de integrador",
      aula_virtual: "En todos los casos el aula virtual",
      preguntas: "Es necesario",
      notas: "se forma"
    };
    const traits = {
      no: "por mail",
      si: "por teléfono",
      default: ""
    };
    const entities = {
      Campus:
        "se encuentra en el Campus de exámenes, en la solapa con la fecha",
      Departamento_alumnos: "al departamento de alumnos",
      Descargas: "se descarga de la página de cátedra",
      especifcar_examen:
        "que me especifiques el tipo de exámen, parcial o integrador",
      Mensaje_Coordinaci_n: "con la coordinación de la materia",
      mensaje_departamento: "con el departamento de la materia",
      mensaje_docentes: "a los docentes de tu cátedra",
      nota_cursada: "con las notas de parciales, TP y otras actividades.",
      nota_actas:
        "promediando la de cursada con la del integrador, esta última tiene más peso."
    };
    try {
      var keys = [];
      for (var k in respuesta.entities) keys.push(k);
      const entitie = entities[k.split(":")[1]];
      const action = traits[respuesta.traits.mensaje_instant_neo[0].value];
      const resultado =
        intents[respuesta.intents[0].name] + " " + action + " " + entitie;
      const greetingMessage = this.createChatBotMessage(resultado);
      this.updateChatbotState(greetingMessage);
    } catch (error) {
      const greetingMessage = this.createChatBotMessage("vacio");
      this.updateChatbotState(greetingMessage);
    }
  } //fin funcion

  updateChatbotState(message) {
    // NOTE: This function is set in the constructor, and is passed in
    // from the top level Chatbot component. The setState function here
    // actually manipulates the top level state of the Chatbot, so it's
    // important that we make sure that we preserve the previous state.
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message]
    }));
  }
}

export default ActionProvider;
