document.addEventListener('DOMContentLoaded', function() {
    const petTypeSelect = document.getElementById('pet-type');
    const otherPetTypeDiv = document.getElementById('other-pet-type');
    const otherPetTypeInput = document.getElementById('other-pet-type-input');
  
    petTypeSelect.addEventListener('change', function() {
      if (this.value === 'other') {
        otherPetTypeDiv.style.display = 'block';
        otherPetTypeInput.required = true;
      } else {
        otherPetTypeDiv.style.display = 'none';
        otherPetTypeInput.required = false;
      }
    });
  });