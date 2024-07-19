const toggleTheme = document.getElementById('toggle-theme');
const toggleIcon = document.getElementById('toggle-icon');
const toggleText = document.getElementById('toggle-text');

const profileImage = document.querySelector('.card__image-container img');

const emailLink = document.getElementById('emailLink');

const flagsElement = document.getElementById("flags");

const textsToChange = document.querySelectorAll("[data-section]");

emailLink.addEventListener('click', (e) =>{
    e.preventDefault();
    const emailAddress = emailLink.textContent.trim();
    navigator.clipboard.writeText(emailAddress)
        .then(() => alert('Email address copied to clipboard'))
        .catch(err => console.error('Failed to copy:', err));
})

const changeLanguage = async language=>{
    const requestJson = await fetch(`./languages/${language}.json`)
    const texts = await requestJson.json()

    for(const textToChange of textsToChange){
        const section = textToChange.dataset.section;
        const value = textToChange.dataset.value;

        textToChange.innerHTML = texts[section][value];
    }
}

flagsElement.addEventListener("click", (e) =>{
    changeLanguage(e.target.parentElement.dataset.language);
})

toggleTheme.addEventListener('click', ()=>{
    document.body.classList.toggle('dark');
    if(toggleIcon.src.includes('moon.svg')){
        toggleIcon.src = 'assets/icons/sun.svg';
        toggleText.textContent='Light Mode';
        profileImage.src = 'assets/images/profile.jpeg';
    }else{
        toggleIcon.src = 'assets/icons/moon.svg';
        toggleText.textContent='Dark Mode';
        profileImage.src = 'assets/images/profile2.jpeg';
    }
})
;