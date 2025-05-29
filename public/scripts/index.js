function openModal(id) {
  document.getElementById(id).classList.remove("hidden");
  if (id === "modal1") {
    imageSlider(
      "projectImages1",
      [
        "/aramkorimeresek/tuzamer.mp4",
        "/aramkor/1.png",
        "/aramkor/2.png",
        "/aramkor/3.jpeg",
        "/aramkor/4.mov",
        "/aramkor/5.jpeg",
        "/aramkor/6.mov",
        "/aramkor/7.mov",
        "/aramkor/8.jpeg",
        "/aramkor/9.jpeg",
      ],
      "leftButtonImg1",
      "rightButtonImg1",
      "imageCounter1",
      "projectVideo1"
    );
  } else if (id === "modal2") {
    imageSlider(
      "projectImages2",
      [
        "/gepszereles/1.jpg",
        "/gepszereles/2.jpg",
        "/gepszereles/3.jpg",
        "/gepszereles/4.jpg",
        "/gepszereles/5.jpg",
        "/gepszereles/6.jpg",
        "/gepszereles/7.jpg",
      ],
      "leftButtonImg2",
      "rightButtonImg2",
      "imageCounter2",
      null
    );
  }
}

function closeModal(id) {
  document.getElementById(id).classList.add("hidden");
  if (id === "modal1") {
    const video = document.getElementById("projectVideo1");
    video.pause();
    video.currentTime = 0;
  }
  if (id === "modal2") {
    const video = document.getElementById("projectVideo2");
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  }
}

function imageSlider(
  elementId,
  mediaList,
  leftButtonId,
  rightButtonId,
  currentMediaId,
  videoElementId = null
) {
  let index = 0;

  const element = document.getElementById(elementId);
  const leftButton = document.getElementById(leftButtonId);
  const rightButton = document.getElementById(rightButtonId);
  const currentMedia = document.getElementById(currentMediaId);
  const videoElement = videoElementId
    ? document.getElementById(videoElementId)
    : null;

  function stopVideo() {
    if (videoElement) {
      videoElement.pause();
      videoElement.currentTime = 0;
    }
  }

  function updateMedia() {
    const currentFile = mediaList[index];
    const isVideo = currentFile.endsWith("mp4") || currentFile.endsWith("mov");

    // Stop any playing video before switching
    stopVideo();

    if (isVideo) {
      element.classList.add("hidden"); // Hide image
      if (videoElement) {
        videoElement.classList.remove("hidden"); // Show video
        videoElement.src = currentFile;
        videoElement.currentTime = 0;
        videoElement.play(); // Autoplay video
      }
    } else {
      if (videoElement) {
        videoElement.classList.add("hidden"); // Hide video
      }
      element.classList.remove("hidden"); // Show image
      element.src = currentFile;
    }

    currentMedia.innerHTML = `${index + 1}/${mediaList.length}`;
  }

  // Initial media load
  updateMedia();

  leftButton.addEventListener("click", () => {
    index--;
    if (index < 0) {
      index = mediaList.length - 1;
    }
    updateMedia();
  });

  rightButton.addEventListener("click", () => {
    index++;
    if (index >= mediaList.length) {
      index = 0;
    }
    updateMedia();
  });
}

// Egy per sor limitálása
function limitSelection(rowName) {
  const checkboxes = document.querySelectorAll(`input[name="${rowName}"]`);
  checkboxes.forEach((cb) => {
    if (!event || cb !== event.target) {
      cb.checked = false;
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  limitSelection("row1");
  limitSelection("row2");
});

function suggestCable() {
  const row1Selection = document.querySelector('input[name="row1"]:checked');
  const row2Selection = document.querySelector('input[name="row2"]:checked');
  const suggestionText = document.getElementById("suggestion");

  if (row1Selection && row2Selection) {
    const device1 = row1Selection.value;
    const device2 = row2Selection.value;

    if (device1 === "Hub" || device1 === "Switch") {
      if (device2 === "Hub" || device2 === "Switch") {
        suggestionText.innerText = "Fordított kábel kell.";
      } else if (device2 === "Router" || device2 === "Workstation") {
        suggestionText.innerText = "Normál kábel kell.";
      }
    } else if (device1 === "Router" || device1 === "Workstation") {
      if (device2 === "Hub" || device2 === "Switch") {
        suggestionText.innerText = "Normál kábel kell.";
      } else if (device2 === "Router" || device2 === "Workstation") {
        suggestionText.innerText = "Fordított kábel kell.";
      }
    }
  } else {
    suggestionText.innerText = "Mindkét sorból 1 eszközt válassz ki!";
  }
}

function displayIPInfo() {
  const input = document.getElementById("ipInput").value;
  const [ipAddress, subnetMask] = input.split("/");

  // Convert the subnet mask to a dotted decimal format
  const maskBits = parseInt(subnetMask);
  const mask = (0xffffffff << (32 - maskBits)) >>> 0;
  const netmask = [
    (mask >>> 24) & 255,
    (mask >>> 16) & 255,
    (mask >>> 8) & 255,
    mask & 255,
  ].join(".");

  // Calculate network address
  const ipParts = ipAddress.split(".").map((part) => parseInt(part, 10));
  const ipInt =
    (ipParts[0] << 24) | (ipParts[1] << 16) | (ipParts[2] << 8) | ipParts[3];
  const networkInt = ipInt & mask;
  const networkAddress = [
    (networkInt >>> 24) & 255,
    (networkInt >>> 16) & 255,
    (networkInt >>> 8) & 255,
    networkInt & 255,
  ].join(".");

  // Calculate broadcast address
  const broadcastInt = networkInt | (~mask >>> 0);
  const broadcastAddress = [
    (broadcastInt >>> 24) & 255,
    (broadcastInt >>> 16) & 255,
    (broadcastInt >>> 8) & 255,
    broadcastInt & 255,
  ].join(".");

  // Display the results
  document.getElementById("address").innerText = "Address: " + ipAddress;
  document.getElementById("mask").innerText = "Mask: " + netmask;
  document.getElementById("network").innerText = "Hálózat: " + networkAddress;
  document.getElementById("broadcast").innerText =
    "Broadcast: " + broadcastAddress;
}

function enlargeImage(img) {
  window.open(img.src, "_blank");
}
