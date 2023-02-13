function onSubmit(e) {
  e.preventDefault();
  document.querySelector(".msg").textContent = "";
  document.querySelector("#image").src = "";
  const prompt = document.querySelector("#prompt").value;
  const size = document.querySelector("#size").value;
  if (prompt === "") {
    alert("Please add some text");
    return;
  }
  generateImageRequest(prompt, size);
}

async function generateImageRequest(prompt, size) {

  if (size == "small") {
    size = "256x256";
  } else if (size == "medium") {
    size = "512x512";
  } else {
    size = "1024x1024";
  }

  try {

    showSpinner();

    const response = await fetch("/openai/generateimage/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        size,
      }),
    });

    if (!response.ok) {
      removeSpinner();
      throw new Error("That image could not be generated");
    }

    const data = await response.json();
    const imageUrl = data.data;
    document.querySelector("#image").src = imageUrl;
    removeSpinner();

  } catch (error) {

    document.querySelector(".msg").textContent = error;
    
  }
}

async function uploadFile() {
  showSpinner();

  try {
    let formData = new FormData();
    formData.append("fileupload", fileupload.files[0]);
    const response = await fetch(
      "/openai/generatevariation/",
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.status == 400) {
      document.querySelector(".msg").textContent =
        "Não foi possível gerar variações para esta imagem";
      removeSpinner();
      return;
    }

    const data = await response.json();

    document.querySelector("#v_1").src = data._v.data[0].url;
    document.querySelector("#v_2").src = data._v.data[1].url;
    document.querySelector("#v_3").src = data._v.data[2].url;
  } catch (error) {
    console.log(error);
    document.querySelector(".msg").textContent = error;
  }

  removeSpinner();
}

function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}

function removeSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

document.querySelector("#image-form").addEventListener("submit", onSubmit);
