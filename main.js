const text = document.getElementById('text');
const textOut = document.getElementById('text-out');
const encrypt = document.getElementById('encrypt');
const decrypt = document.getElementById('decrypt');
const copy = document.getElementById('copy');
const out = document.getElementById('out');
const notification = document.getElementById('notification');

const vocales = [
  'a',
  'e',
  'i',
  'o',
  'u'
];

const vocalesEncrypt = [
  'ai',
  'enter',
  'imes',
  'ober',
  'ufat'
];

const valuesEncrypt = {
  a: vocalesEncrypt[0],
  e: vocalesEncrypt[1],
  i: vocalesEncrypt[2],
  o: vocalesEncrypt[3],
  u: vocalesEncrypt[4]
};

const valuesDecrypt = {
  ai: vocales[0],
  enter: vocales[1],
  imes: vocales[2],
  ober: vocales[3],
  ufat: vocales[4]
};

const evalEntry = (type) => {
  const value = text.value.trim();

  let newText = value;

  if (type === "encrypt") {    
    const mapping = value.split("");
  
    const newArr = mapping.map((e) => evalLetter(e));
  
    newText = newArr.join('');
  };

  if (type === "decrypt") {
    vocalesEncrypt.map(
      (e) => {
        const regex = new RegExp(e,"g");

        newText = newText.replace(regex,valuesDecrypt[e]);
      }
    );
  };

  out.classList.add('between');

  textOut.innerHTML =
    `
      <span class="text" id="text-copy">
        ${newText}
      </span>
    `
  ;

  copy.classList.remove('none');
};

const evalLetter = (letter) => {
  let value = letter;

  const exists = vocales.includes(letter);

  if (exists) {
    value = valuesEncrypt[letter];
  };

  return value;
};

const copyText = () => {
  const textCopy = document.getElementById('text-copy');
  
  const text = textCopy.innerText;

  notification.classList.add('active');

  navigator.clipboard.writeText(text)
    .then(() => {
      setTimeout(() => {
        notification.classList.remove('active');
      }, 2000);
    })
    .catch((error) => {
    });
};

encrypt.addEventListener(
  "click",
  () => evalEntry("encrypt")
);

decrypt.addEventListener(
  "click",
  () => evalEntry("decrypt")
);

copy.addEventListener(
  "click",
  copyText
);