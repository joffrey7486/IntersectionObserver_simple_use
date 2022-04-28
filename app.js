const cards = document.querySelectorAll('.card');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        entry.target.classList.toggle("show", entry.isIntersecting)
    })
}, {
    // threshold est le pourcentage de la taille de la fenêtre qui doit être atteinte pour que l'élément soit affiché
    threshold: 1,

    // root est le point de départ de l'observation
    // rootMargin: "-50px"
})

const lastCardObserver = new IntersectionObserver(entries => {
    const lastCard = entries[0];
    // si la carte est visible 
    if (lastCard.isIntersecting) return // on arrête l'observation
    // sinon on charge de nouvelles cartes
    loadNewCards();
    lastCardObserver.unobserve(lastCard.target); // on arrête l'observation de la dernière carte
    lastCardObserver.observe(document.querySelector('.card:last-child')) // on relance l'observation de la nouvelle dernière carte
}, {
    rootMargin: "-50px"
})

lastCardObserver.observe(document.querySelector('.card:last-child'))

cards.forEach(card => {
    observer.observe(card)
})

const cardContainer = document.querySelector('.card-container');
const loadNewCards = () => {
    for (let i = 0; i < 10; i++){
        const card = document.createElement('div');
        card.textContent = "Nouvelle carte";
        card.classList.add('card');
        observer.observe(card);
        cardContainer.append(card);
    }
}