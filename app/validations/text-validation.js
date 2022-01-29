const textValidation = (value) => {

    //mínimo de caracteres do campo
    if (value.trim().length < 3) {
        return "Por favor, informe no mínimo 3 caracteres."
    }
    else if (value.trim().length > 150) {
        return "Por favor, informe no máximo 150 caracteres."
    }

    return true;
}

export default textValidation;