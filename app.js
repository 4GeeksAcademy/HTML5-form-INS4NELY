document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');
  const alertDanger = document.querySelector('.alert-danger');

  document.getElementById('validationCustom01').addEventListener('input', validateCard);
  document.getElementById('validationCustom02').addEventListener('input', validateCVC);
  document.getElementById('validationCustom03').addEventListener('input', validateAmount);
  document.getElementById('validationCustom04').addEventListener('input', validateFirstName);
  document.getElementById('validationCustom05').addEventListener('input', validateLastName);
  document.getElementById('validationCustom06').addEventListener('input', validateCity);

  document.querySelectorAll('#validationCustom04, #validationCustom05, #validationCustom06').forEach(input => {
    input.addEventListener('input', function() {
      this.value = this.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ ]/g, '');
    });
  });

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    form.classList.remove('needs-validation');
    alertDanger.classList.add('d-none');

    const isValid = [
      validateCard(),
      validateCVC(),
      validateAmount(),
      validateFirstName(),
      validateLastName(),
      validateCity(),
      validateState(),
      validatePostal(),
      validateRadio()
    ].every(validation => validation === true);

    if (isValid) {
      form.submit();
    } else {
      form.classList.add('needs-validation');
      alertDanger.classList.remove('d-none');
    }
  });

  function validateCard() {
    const input = document.getElementById('validationCustom01');
    const isValid = input.value.length === 16 && !isNaN(input.value);
    toggleValidation(input, isValid);
    return isValid;
  }

  function validateCVC() {
    const input = document.getElementById('validationCustom02');
    const isValid = (input.value.length === 3 || input.value.length === 4) && !isNaN(input.value);
    toggleValidation(input, isValid);
    return isValid;
  }

  function validateAmount() {
    const input = document.getElementById('validationCustom03');
    const isValid = input.value > 0;
    toggleValidation(input, isValid);
    return isValid;
  }

  function validateFirstName() {
    const input = document.getElementById('validationCustom04');
    const isValid = input.value.trim() !== '';
    toggleValidation(input, isValid);
    return isValid;
  }

  function validateLastName() {
    const input = document.getElementById('validationCustom05');
    const isValid = input.value.trim() !== '';
    toggleValidation(input, isValid);
    return isValid;
  }

  function validateCity() {
    const input = document.getElementById('validationCustom06');
    const isValid = input.value.trim() !== '';
    toggleValidation(input, isValid);
    return isValid;
  }

  function validateState() {
    const input = document.getElementById('validationCustom07');
    const isValid = input.value !== '';
    toggleValidation(input, isValid);
    return isValid;
  }

  function validatePostal() {
    const input = document.getElementById('validationCustom08');
    const isValid = input.value.trim() !== '';
    toggleValidation(input, isValid);
    return isValid;
  }

  function validateRadio() {
    const radios = document.querySelectorAll('input[name="inlineRadioOptions"]');
    const isChecked = Array.from(radios).some(radio => radio.checked);
    const errorSpan = document.getElementById('alert-radio');
    errorSpan.classList.toggle('d-none', isChecked);
    return isChecked;
  }

  function toggleValidation(input, isValid) {
    input.classList.toggle('is-valid', isValid);
    input.classList.toggle('is-invalid', !isValid);
  }
});