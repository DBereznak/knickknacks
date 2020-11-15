class ImageUploader {
    hostDiv: string;
    hasImage: boolean = false;

    constructor(hostdiv: string){
        this.hostDiv = hostdiv;
    }

    createImageUploader(){
        const hostContainer = document.getElementById(this.hostDiv);
        const imageUploaderContainer = document.createElement("div");
        const uploaderForm: string = `
        <p><label for="file">Image</label></p>
        <p><input type="file" id="file" accept="image/*" name="image"></p><br/>
        <img id="output" width="600">`;
        imageUploaderContainer.classList.add('uploader');
        imageUploaderContainer.innerHTML = uploaderForm;
        hostContainer.appendChild(imageUploaderContainer);
        const display = document.getElementById("file");
        display.addEventListener("change", event => this.displayImage(event));
    }

    displayImage(event){
        const image = document.getElementById("output") as HTMLImageElement;
        image.src = URL.createObjectURL(event.target.files[0]);
        this.hasImage = true;
        if(this.hasImage){
            this.imageFilters();
        }
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
        <input type="range" min="0" max="100" value="0" id="contrast">
        `;
        filterContainer.classList.add('filter-container');
        filterContainer.innerHTML = filters;
        main.appendChild(filterContainer);
        const blur = document.getElementById("blur");
        blur.addEventListener("change", this.updateCSSFilters);
        const grayscale = document.getElementById("grayscale");
        grayscale.addEventListener("change", this.updateCSSFilters);
    }

    updateCSSFilters(){
        
        const image = document.getElementById("output");
        let blurValue = document.getElementById("blur") as HTMLInputElement;
        let grayscaleValue = document.getElementById("grayscale") as HTMLInputElement;
        console.log(blurValue);
            image.style.filter = `
            blur(${blurValue.value}px);
            grayscale(${grayscaleValue.value}%);
            `;        
    }
}

export {ImageUploader};