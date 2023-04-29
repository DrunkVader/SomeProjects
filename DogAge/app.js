const dogImages = [
  "https://i.postimg.cc/JnB9XjXM/doggo-bebe.webp",
  "https://i.postimg.cc/mrnvhmtm/doggo-adolescente.webp",
  "https://i.postimg.cc/tRWKCtyz/doggo-mediana-edad.webp",
  "https://i.postimg.cc/hvL6ygMY/doggo-viejo.webp",
  "https://i.postimg.cc/8C9MNCdL/oldoggo1.webp",
  "https://i.postimg.cc/FK73MSS9/oldoggo2.webp",
  "https://i.postimg.cc/QdNpqwxK/oldoggo3.webp",
  "https://i.postimg.cc/JzTjYxG6/oldoggo4.webp",
  "https://i.postimg.cc/c4BRw0ZN/oldoggo5.webp",
  "https://i.postimg.cc/Qtwnv5d5/doggo2.webp",
  "https://i.postimg.cc/h4QYTC20/doggo3.jpg",
  "https://i.postimg.cc/VvtHw6Jh/doggo5.jpg",
  "https://i.postimg.cc/Twp4kQff/doggo6.webp",
  "https://i.postimg.cc/q7BYK4Ft/doggo7.jpg",
  "https://i.postimg.cc/Hk9RjV6D/doggo8.jpg",
  "https://i.postimg.cc/FsqJBTQ5/dog-portrait-black-white.jpg",
  "https://i.postimg.cc/VNwvxTGT/doggo-Drive.jpg",
  "https://i.postimg.cc/YqJh3j1t/doggoplaya.jpg",
  "https://i.postimg.cc/kGGBjb1g/doggopucha.webp",
  "https://i.postimg.cc/Hky7DbpJ/doggosing.webp",
  "https://i.postimg.cc/cCvL7NCK/doggosurprise.png",
  "https://i.postimg.cc/Nfr05YZS/doggotumbao.png",
  "https://i.postimg.cc/26c5B5kR/dogobubs.png",
  "https://i.postimg.cc/4dBYb510/dogodaylidog.webp",
  "https://i.postimg.cc/26zqZJnv/dogofuniface.jpg",
  "https://i.postimg.cc/PqnvtNxS/dogofurius.jpg",
  "https://i.postimg.cc/MZ3cn9HM/dogopickles.jpg",
  "https://i.postimg.cc/ZRKRRNhx/dogoread.jpg",
  "https://i.postimg.cc/XvKGX3B4/dogosops.jpg",
  "https://i.postimg.cc/5NHXL8QP/dogosurf.jpg",
  "https://i.postimg.cc/wjL3bHVL/dogoyawn.jpg",
  "https://i.postimg.cc/YqjWRJZz/dogpelo.jpg",
  "https://i.postimg.cc/SRPjHx37/punkdogo.webp",
  "https://i.postimg.cc/kMTSxn15/tunasmoking.jpg",
];

let randomDogImages = [];
let currentIndex = 0;

// Generate a random list of all dog images
while (randomDogImages.length < dogImages.length) {
  const randomIndex = Math.floor(Math.random() * dogImages.length);
  if (!randomDogImages.includes(dogImages[randomIndex])) {
    randomDogImages.push(dogImages[randomIndex]);
  }
}

function calculateDogAge() {
  const humanAge = parseInt(document.getElementById("age").value);

  if (isNaN(humanAge) || humanAge === 0) {
    document.getElementById(
      "result"
    ).textContent = `Introduce a number above 0 to calculate your age if you were a dog`;
    document.getElementById("dog-image").src = "";
    return;
  }

  const earlyYears = 2 * 7;
  const laterYears = (humanAge - 2) * 4;
  const dogAge = earlyYears + laterYears;

  // Show the next dog image in the random list
  const dogImage = randomDogImages[currentIndex];
  document.getElementById(
    "result"
  ).textContent = `If you were a dog, you would be ${dogAge} years old.`;
  document.getElementById("dog-image").src = dogImage;

  // Move to the next image in the list
  currentIndex = (currentIndex + 1) % randomDogImages.length;
}

document.getElementById("age").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("calculate").click();
  }
});
