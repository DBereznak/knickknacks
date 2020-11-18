class ImageUploader {
    hostDiv: string;
    hasImage: boolean = false;
    filters: string;
    imageSource: string;

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
        <a class="disabled" id="saveImage">Save Image</a>`;
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
        console.log(this.imageSource);
    }

    imageFilters(){
        const main = document.getElementById("main");
        const filterContainer = document.createElement('div');
        const filters = `
        <label for="blur">Blur</label>
        <input type="range" min="0" max="20" value="0"  id="blur">
        <label for="grayscale">GrayScale</label>
        <input type="range" min="0" max="100" value="0" id="grayscale">
        <label for="contrast">Contrast</label>
        <input type="range" min="0" max="100" value="100" id="contrast">
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
    }

    updateCSSFilters(){      
        const image = document.getElementById("output");
        let blurValue = document.getElementById("blur") as HTMLInputElement;
        let grayscaleValue = document.getElementById("grayscale") as HTMLInputElement;
        let contrastValue = document.getElementById("contrast") as HTMLInputElement;
        this.filters = `
        blur(${blurValue.value}px)
        grayscale(${grayscaleValue.value}%)
        contrast(${contrastValue.value}%)
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
        console.log(tempImage['imageSource'].style.filter);
        ctx.drawImage(tempImage['imageSource'], 0, 0, canvas.width, canvas.height);
        downloadLink.href = canvas.toDataURL();
        downloadLink.download = "image.png";
        main.appendChild(canvas);

    }
}


export {ImageUploader};