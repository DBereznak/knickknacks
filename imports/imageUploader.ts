class ImageUploader {
    hostDiv: string;
    hasImage: boolean = false;
    filters: string;

    constructor(hostdiv: string){
        this.hostDiv = hostdiv;
    }

    createImageUploader(){
        const hostContainer = document.getElementById(this.hostDiv);
        const imageUploaderContainer = document.createElement("div");
        const uploaderForm: string = `
        <p><label for="file">Image</label></p>
        <p><input type="file" id="file" accept="image/*" name="image"></p><br/>
        <img id="output" width="600"><br/>
        <a class="disabled" id="saveImage" download>Save Image</a>`;
        imageUploaderContainer.classList.add('uploader');
        imageUploaderContainer.innerHTML = uploaderForm;
        hostContainer.appendChild(imageUploaderContainer);
        const display = document.getElementById("file");
        display.addEventListener("change", event => this.displayImage(event));
        const btn = document.getElementById("saveImage");
        btn.addEventListener("click", this.downloadImage);
    }

    displayImage(event){
        const image = document.getElementById("output") as HTMLImageElement;
        const btn = document.getElementById("saveImage") as HTMLElement;
        image.src = URL.createObjectURL(event.target.files[0]);
        this.hasImage = true;
        if(this.hasImage){
            this.imageFilters();
            btn.classList.remove("disabled");
        }
    }

    imageFilters(){
        const main = document.getElementById("main");
        const filterContainer = document.createElement('div');
        const filters = `
        <label for="blur">Blur</label>
        <input type="range" min="0" max="20" value="0"  id="blur"><br>
        <label for="grayscale">GrayScale</label>
        <input type="range" min="0" max="100" value="0" id="grayscale"><br>
        <label for="contrast">Contrast</label>
        <input type="range" min="0" max="200" value="100" id="contrast"><br>
        <label for="sepia">Sepia</label>
        <input type="range" min="0" max="100" value="0" id="sepia"><br>
        <label for="opacity">Opacity</label>
        <input type="range" min="0" max="100" value="100" id="opacity"><br>
        <label for="saturate">Saturate</label>
        <input type="range" min="0" max="100" value="100" id="saturate"><br>
        `;
        filterContainer.classList.add('filter-container');
        filterContainer.innerHTML = filters;
        main.appendChild(filterContainer);
        const blur = document.getElementById("blur");
        blur.addEventListener("change", this.updateCSSFilters);
        const grayscale = document.getElementById("grayscale");
        grayscale.addEventListener("change", this.updateCSSFilters);
        const contrast = document.getElementById("contrast");
        contrast.addEventListener("change", this.updateCSSFilters);
        const sepia = document.getElementById("sepia");
        sepia.addEventListener("change", this.updateCSSFilters);
        const opacity = document.getElementById("opacity");
        opacity.addEventListener("change", this.updateCSSFilters);
        const saturate = document.getElementById("saturate");
        saturate.addEventListener("change", this.updateCSSFilters);
    }

    updateCSSFilters(){      
        const image = document.getElementById("output");
        let blurValue = document.getElementById("blur") as HTMLInputElement;
        let grayscaleValue = document.getElementById("grayscale") as HTMLInputElement;
        let contrastValue = document.getElementById("contrast") as HTMLInputElement;
        let sepiaValue = document.getElementById("sepia") as HTMLInputElement;
        let opacityValue = document.getElementById("opacity") as HTMLInputElement;
        let saturateValue = document.getElementById("saturate") as HTMLInputElement;
        this.filters = `
        blur(${blurValue.value}px)
        grayscale(${grayscaleValue.value}%)
        contrast(${contrastValue.value}%)
        sepia(${sepiaValue.value}%)
        opacity(${opacityValue.value}%)
        saturate(${saturateValue.value}%)
    `;  
    image.style.filter = this.filters;      
    }

    downloadImage(){
        const main = document.getElementById("main");
        const canvas = document.createElement("canvas");
        const downloadLink = document.getElementById("saveImage") as HTMLLinkElement;
        let tempImage = {
            imageSource:  document.getElementById("output") as HTMLImageElement
        }
        canvas.width = 600;
        canvas.height = 600;
        const ctx = canvas.getContext("2d");
        ctx.filter = tempImage['imageSource'].style.filter;
        console.log(tempImage['imageSource'].style.filter); //delete eventually
        ctx.drawImage(tempImage['imageSource'], 0, 0, canvas.width, canvas.height);
        downloadLink.href = canvas.toDataURL();
        main.appendChild(canvas);

    }
}


export {ImageUploader};