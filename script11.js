let memeList;
let url = "https://api.imgflip.com/get_memes";
function getMemes() {
    fetch(url) //3s
        .then((prom) => {
            return prom.json();
        }).then(json => {
            memeList = json.data.memes;
            console.log(json.data.memes);
            renderMemes(memeList, container)
        });
}
getMemes();


// DOM elements

let container = document.getElementById("container");
let likedParagraph = document.getElementById('likedParagraph');
let likedContainer = document.getElementById('liked');
let btnView = document.getElementById('view');


//Render memes

function renderMemes(arr, div) {
    arr.forEach((meme) => {
        let item = createMeme(meme)
        div.appendChild(item);
    });

    if (div !== container) {
        container.classList.add('notactive');
    }
}

// Create meme

function createMeme(meme) {
    let item = document.createElement('div');
    item.classList.add('item');
    item.id = `${meme.id}`
    item.innerHTML = `<img src="${meme.url}" alt="${meme.name}">
    <div id="meme">${meme.name}</div>
    <div><button class="btn">👍Like</button></div>
    `
    item.querySelector('.btn').addEventListener('click', function () {
        let memeIndex = likeList.findIndex(likedMeme => likedMeme.id === meme.id)
        if (memeIndex >= 0) {
            likeList.splice(memeIndex, 1);
            likedParagraph.innerHTML = `You have liked: ${likeList.length} memes. `
        } else {
            likeList.push(meme);
            likedParagraph.innerHTML = `You have liked: ${likeList.length} memes. `
        }

    })
    return item;
}


//Render liked memes

let likeList = [];
btnView.addEventListener('click', () => {
    renderMemes(likeList, likedContainer);
});

