const popup = document.querySelector('.edit_category.flex_column');
const details = document.querySelector('.details.popup.flex_column');
const right_section = document.querySelector('.right_section.flex_column');
var myInterval, myInterval1, myInterval2, myInterval3, myInterval4, myInterval5, myInterval6
// const BASE_URL = 'https://eloroverde-pjc5.onrender.com/' 

document.addEventListener('click', () => {
    if (notifications) {
        if (notifications.style.display === 'flex') notifications.style.display = 'none';
    }
    if (document.querySelector('#menu').style.transform === 'scaleY(1)') document.querySelector('#menu').style.transform = 'scaleY(0)';
    if (document.querySelector('#language').style.transform === 'scaleY(1)') {
        document.querySelector('#language').style.transform = 'scaleY(0)';
        document.querySelector('#language').style.top = '50%';
    }
});

function displayStock(e) {
    Array.from(e.currentTarget.children).forEach(color => {
        color.classList.remove('active');
    });

    e.target.classList.add('active');
}

async function showDetails(e, element) {
    e.stopPropagation();
    if (element === 'edit_category') {
        const element = document.querySelector('.edit_category.flex_column');
        element.style.display = 'flex';
        setTimeout(() => { element.style.transform = 'scale(1)'; });
        element.querySelector('h1').innerHTML = 'Edit Category';
        element.querySelector('.input.flex_column:nth-child(2) input').placeholder = e.currentTarget.parentElement.parentElement.querySelector('p:nth-child(2)').innerHTML;
        if (document.querySelector('.main_category button#category') === e.currentTarget || e.currentTarget.parentElement.parentElement.parentElement.parentElement.classList.contains('main_category')) {
            element.querySelector('h1').innerHTML = 'Edit Main Category';
            element.querySelector('p:nth-child(1)').innerHTML = 'New Category Name';
            element.querySelector('.category_name').style.display = 'none';
            element.querySelector('.subcategory_name').style.display = 'none';
        } else if (e.currentTarget.parentElement.parentElement.parentElement.classList.contains('first_subcategory')) {
            element.querySelector('h1').innerHTML = 'Edit Subcategory';
            element.querySelector('p:nth-child(1)').innerHTML = 'New Subcategory Name';
            element.querySelector('.input .image_input').parentElement.style.display = 'none';
            element.querySelector('.input .image_input').parentElement.insertAdjacentElement('beforebegin', element.querySelector('.category_name'));
            element.querySelector('.category_name').style.display = 'flex';
        } else {
            element.querySelector('h1').innerHTML = 'Edit Subcategory';
            element.querySelector('p:nth-child(1)').innerHTML = 'New Subcategory Name';
            element.querySelector('.input .image_input').parentElement.style.display = 'block';
            element.querySelector('.input .image_input').parentElement.insertAdjacentElement('beforebegin', element.querySelector('.category_name'));
            element.querySelector('.input .image_input').parentElement.insertAdjacentElement('beforebegin', element.querySelector('.subcategory_name'));
            element.querySelector('.category_name').style.display = 'flex';
            element.querySelector('.subcategory_name').style.display = 'flex';
        }
    } else if (element === 'add_category') {
        const element = document.querySelector('.edit_category.flex_column');
        element.style.display = 'flex';
        setTimeout(() => { element.style.transform = 'scale(1)'; });
        if (document.querySelector('.main_category button#category') === e.currentTarget) {
            element.querySelector('h1').innerHTML = 'Add Main Category';
            element.querySelector('p:nth-child(1)').innerHTML = 'New Category Name';
            element.querySelector('.category_name').style.display = 'none';
            element.querySelector('.subcategory_name').style.display = 'none';
        } else if (document.querySelector('.first_subcategory button') === e.currentTarget || document.querySelector('#packs_tab').classList.contains('active')) {
            element.querySelector('h1').innerHTML = 'Add Subcategory';
            element.querySelector('p:nth-child(1)').innerHTML = 'New Subcategory Name';
            element.querySelector('.input .image_input').parentElement.style.display = 'none';
            element.querySelector('.input .image_input').parentElement.insertAdjacentElement('beforebegin', element.querySelector('.category_name'));
            element.querySelector('.category_name').style.display = 'block';
        } else {
            element.querySelector('h1').innerHTML = 'Add Subcategory';
            element.querySelector('p:nth-child(1)').innerHTML = 'New Subcategory Name';
            element.querySelector('.input .image_input').parentElement.style.display = 'block';
            element.querySelector('.input .image_input').parentElement.insertAdjacentElement('beforebegin', element.querySelector('.category_name'));
            element.querySelector('.input .image_input').parentElement.insertAdjacentElement('beforebegin', element.querySelector('.subcategory_name'));
            element.querySelector('.category_name').style.display = 'block';
            element.querySelector('.subcategory_name').style.display = 'block';
        }
    } else if (element === 'category') {
        // Show first sub category
        const productDetails = document.querySelector('#products');
        // Set name of category on header
        productDetails.querySelector('h1').innerHTML = `Back &gt; List Of ${ e.currentTarget.innerText } Products`;
        // Hide main category screen
        productDetails.previousElementSibling.style.display = 'none';
        // Show first subcategory screen
        productDetails.style.display = 'flex';
        // Change name of button
        document.querySelector('.first_subcategory button').innerHTML = 'Add New Subcategory';
        // Animation
        gsap.from('.first_subcategory #product_details_table_stagger', {
            y: '-2rem',
            opacity: 0,
            stagger: 0.3
        });
    } else if (element === 'back') {
        // If user clicks on back
        // Hide Everything on screen
        Array.from(right_section.children).forEach(child => { child.style.display = 'none' });
        // If user clicks on back from edit / add product screen show products screen
        if (document.getElementById('virals_tab').classList.contains('active')) {
            // If user clicks on back from first subcategory table
            document.querySelector('.header.flex_row.center.space_between').style.display = 'flex';
            right_section.children[5].style.display = 'flex';
            document.querySelector('.footer').style.display = 'flex';
        } else if (e.currentTarget.innerText.trim() === 'Back > Edit Product' || e.currentTarget.innerText.trim() === 'Back > Add Product') {
            document.querySelector('.header.flex_row.center.space_between').style.display = 'flex';
            document.querySelector('.third_category').style.display = 'flex';
            document.querySelector('.footer').style.display = 'flex';
            await gsap.from('.third_category #product_details_table_stagger', {
                y: '-2rem',
                opacity: 0,
                stagger: 0.3
            });
        } else if (e.currentTarget.parentElement.parentElement.id === 'brands_table') {
            // If user clicks back from brands table
            document.querySelector('.header.flex_row.center.space_between').style.display = 'flex';
            right_section.children[3].style.display = 'flex';
            right_section.children[6].style.display = 'flex';
            await gsap.from('#brand_table_stagger', {
                y: '-2rem',
                opacity: 0,
                delay: 0.5,
                stagger: 0.3
            });
        } else if (e.currentTarget.parentElement.parentElement.classList.contains('first_subcategory')) {
            // If user clicks on back from first subcategory table
            document.querySelector('.header.flex_row.center.space_between').style.display = 'flex';
            right_section.children[5].style.display = 'flex';
            document.querySelector('.footer').style.display = 'flex';
        } else if (e.currentTarget.parentElement.parentElement.classList.contains('second_category')) {
            if (document.querySelector('#packs_tab').classList.contains('active')) {
                document.querySelector('.header.flex_row.center.space_between').style.display = 'flex';
                right_section.children[5].style.display = 'flex';
                document.querySelector('.footer').style.display = 'flex';
                return;
            }
            
            // If user clicks on back from second subcategory table
            document.querySelector('.header.flex_row.center.space_between').style.display = 'flex';
            right_section.children[6].style.display = 'flex';
            document.querySelector('.footer').style.display = 'flex';
        } else if (e.currentTarget.parentElement.parentElement.classList.contains('third_category')) {
            // If packs or virals is selected go directly to main categories
            if (document.querySelector('#brands_tab').classList.contains('active') ||
                document.querySelector('#virals_tab').classList.contains('active')
               ) {
                document.querySelector('.header.flex_row.center.space_between').style.display = 'flex';
                right_section.children[5].style.display = 'flex';
                document.querySelector('.footer').style.display = 'flex';
                return;
            }
            // If user clicks on back from products table
            document.querySelector('.header.flex_row.center.space_between').style.display = 'flex';
            right_section.children[7].style.display = 'flex';
            document.querySelector('.footer').style.display = 'flex';
        }
    } else if (element === 'second_category') {
        document.querySelector('.main_category').style.display = 'none';
        // Hide first category
        document.querySelector('#products').style.display = 'none';
        // Show second category
        document.querySelector('.second_category').style.display = 'flex';
        // Set name of category to header
        document.querySelector('.second_category h1').innerHTML = `Back &gt; List Of ${ e.currentTarget.innerText } Products`;
        // Change name of button
        document.querySelector('.second_category button').innerHTML = 'Add New Subcategory';
        // Animate
        gsap.from('.second_category #product_details_table_stagger', {
            y: '-2rem',
            opacity: 0,
            stagger: 0.3
        });
    } else if (element === 'third_category') {
        document.querySelector('.main_category').style.display = 'none';
        // Hide second category
        document.querySelector('#products.second_category').style.display = 'none';
        // Show third category
        document.querySelector('.third_category').style.display = 'flex';
        // Set name of category to header
        document.querySelector('.third_category h1').innerHTML = `Back &gt; List Of ${ e.currentTarget.innerText } Products`;
        // Animate
        gsap.from('.third_category #product_details_table_stagger', {
            y: '-2rem',
            opacity: 0,
            stagger: 0.3
        });
    } else if (element === 'product_details') {
        // Hide everything on screen
        Array.from(right_section.children).forEach(child => { child.style.display = 'none' });
        // If User has clicked on add new product button
        if (e.currentTarget.innerText === 'Add New Product' || e.currentTarget.innerText === 'Add New Virals') {
            document.querySelector('.details.popup').querySelector('.header p').innerHTML = 'Back &gt; Add Product';
            document.querySelector('.final_categories').style.display = 'none';
            if (document.getElementById('products_tab').classList.contains('active') || document.getElementById('packs_tab').classList.contains('active')) document.querySelector('.final_categories').style.display = 'flex';
        }
        // If user has clicked on edit product button (yellow pencil)
        else {
            document.querySelector('.details.popup').querySelector('.header p').innerHTML = 'Back &gt; Edit Product';
            // For products table
            if (document.getElementById('products_tab').classList.contains('active') || document.getElementById('packs_tab').classList.contains('active')) {
                document.querySelector('#name').value = e.currentTarget.parentElement.parentElement.querySelector('p:nth-child(2)').innerHTML;
                document.querySelector('#sku').value = e.currentTarget.parentElement.parentElement.querySelector('p:nth-child(6)').innerHTML;
                document.querySelector('#purchase_price').value = e.currentTarget.parentElement.parentElement.querySelector('p:nth-child(5)').innerHTML;
                document.querySelector('#details').value = e.currentTarget.parentElement.parentElement.querySelector('.product_detail p').innerHTML;
                document.querySelector('.final_categories').style.display = 'flex';
            } else {
                // For brands table
                document.querySelector('#name').value = e.currentTarget.parentElement.parentElement.querySelector('p:nth-child(2)').innerHTML;
                document.querySelector('.final_categories').style.display = 'none';
            }
        }
        // Show edit product / edit brand screen
        document.querySelector('.details.popup').style.display = 'flex';
        setTimeout(() => {
            document.querySelector('.details.popup').style.transform = 'scale(1)';
        });
    } else if (element === 'brands') {
        // When user clicks on brands tab hide the main products table and show main brands table
        document.querySelector('.products.width_full').style.display = 'none';
        document.querySelector('.packs.width_full').style.display = 'none';
        document.querySelector('.virals.width_full').style.display = 'none';
        document.querySelector('.brands.width_full').style.display = 'flex';
        // Highlight the selected tab
        Array.from(e.currentTarget.parentElement.children).forEach(child => child.classList.remove('active'));
        e.currentTarget.classList.add('active');
        // Show 'add new brand' button
        document.querySelector('#brands').style.display = 'block';
        // Hide other buttons
        document.querySelector('#category').style.display = 'none';
        document.querySelector('#packs').style.display = 'none';
        document.querySelector('#virals').style.display = 'none';
        // Hide 'add new product' button
        document.querySelector('#category').style.display = 'none';
        await gsap.from('#brand_table_stagger', {
            y: '-2rem',
            opacity: 0,
            delay: 0.5,
            stagger: 0.3
        });
    } else if (element === 'products') {
        // When user clicks on brands tab show the main products table and hide main brands table
        document.querySelector('.products.width_full').style.display = 'block';
        document.querySelector('.brands.width_full').style.display = 'none';
        document.querySelector('.packs.width_full').style.display = 'none';
        document.querySelector('.virals.width_full').style.display = 'none';
        // Highlight the selected tab
        Array.from(e.currentTarget.parentElement.children).forEach(child => child.classList.remove('active'));
        e.currentTarget.classList.add('active');
        // Hide 'add new brand' button
        document.querySelector('#brands').style.display = 'none';
        document.querySelector('#packs').style.display = 'none';
        document.querySelector('#virals').style.display = 'none';
        // Show 'add new product' button
        document.querySelector('#category').style.display = 'block';
        await gsap.from('#product_table_stagger', {
            y: '-2rem',
            opacity: 0,
        });
    } else if (element === 'add_brand') {
        // Show add brand popup
        const element = document.querySelector('.edit_category.edit_brand.flex_column');
        element.style.display = 'flex';
        setTimeout(() => { element.style.transform = 'scale(1)'; });
        element.querySelector('h1').innerHTML = 'Add Brand';
        document.querySelector('#image_input').style.display = 'none';
        if (document.querySelector('.main_category button#brands') === e.currentTarget) element.querySelector('h1').innerHTML = 'Add Main Category';
        else element.querySelector('h1').innerHTML = 'Add Subcategory';
        // If user clicks on yellow pencil button then change the title to Edit brand
        if (e.currentTarget.parentElement.classList.contains('action')) {
            element.querySelector('h1').innerHTML = 'Edit Brand';
            document.querySelector('#image_input').style.display = 'flex';
        }
    } else if (element === 'add_pack') {
        // Show add pack popup
        const element = document.querySelector('.edit_category.edit_pack.flex_column');
        element.style.display = 'flex';
        setTimeout(() => { element.style.transform = 'scale(1)'; });
        element.querySelector('h1').innerHTML = 'Add Pack';
        element.querySelector('#image_input').style.display = 'none';
        // If user is on main categories page change title of popup to Add main category else change it to Add subcategory
        if (document.querySelector('.main_category button#packs') === e.currentTarget) element.querySelector('h1').innerHTML = 'Add Main Category';
        else element.querySelector('h1').innerHTML = 'Add Subcategory';
        // If user clicks on yellow pencil button then change the title to Edit Pack
        if (e.currentTarget.parentElement.classList.contains('action')) {
            element.querySelector('h1').innerHTML = 'Edit Pack';
            element.querySelector('#image_input').style.display = 'flex';
        }
    } else if (element === 'add_viral') {
        // Show add pack popup
        const element = document.querySelector('.edit_category.edit_virals.flex_column');
        element.style.display = 'flex';
        setTimeout(() => { element.style.transform = 'scale(1)'; });
        element.querySelector('h1').innerHTML = 'Add Viral';
        element.querySelector('#image_input').style.display = 'none';
        // If user clicks on yellow pencil button then change the title to Edit Viral
        if (e.currentTarget.parentElement.classList.contains('action')) {
            element.querySelector('h1').innerHTML = 'Edit Viral';
            element.querySelector('#image_input').style.display = 'flex';
        }
    } else if (element === 'brand') {
        // show sub brand screen
        Array.from(right_section.children).forEach(child => { child.style.display = 'none' });
        const brands = document.getElementById('brands_table');
        brands.querySelector('.appointments_header h1').innerHTML = `Back &gt; List Of All ${ e.currentTarget.innerHTML } Products`;
        brands.style.display = 'flex';
        document.querySelector('.header.flex_row.center.space_between').style.display = 'flex';
        right_section.children[6].style.display = 'flex';
    } else if (element === 'packs') {
        // When user clicks on packs tab hide other main tables
        document.querySelector('.products.width_full').style.display = 'none';
        document.querySelector('.brands.width_full').style.display = 'none';
        document.querySelector('.packs.width_full').style.display = 'flex';
        document.querySelector('.virals.width_full').style.display = 'none';
        // Highlight the selected tab
        Array.from(e.currentTarget.parentElement.children).forEach(child => child.classList.remove('active'));
        e.currentTarget.classList.add('active');
        // Show 'add new brand' button
        document.querySelector('#brands').style.display = 'none';
        // Hide 'add new product' button
        document.querySelector('#category').style.display = 'none';
        document.querySelector('#packs').style.display = 'block';
        console.log(document.querySelector('#packs').style.display);
        document.querySelector('#virals').style.display = 'none';
        await gsap.from('#pack_table_stagger', {
            y: '-2rem',
            opacity: 0,
            delay: 0.5,
            stagger: 0.3
        });
    } else if (element === 'virals') {
        // When user clicks on brands tab hide the main products table and show main brands table
        document.querySelector('.products.width_full').style.display = 'none';
        document.querySelector('.brands.width_full').style.display = 'none';
        document.querySelector('.packs.width_full').style.display = 'none';
        document.querySelector('.virals.width_full').style.display = 'flex';
        // Highlight the selected tab
        Array.from(e.currentTarget.parentElement.children).forEach(child => child.classList.remove('active'));
        e.currentTarget.classList.add('active');
        // Show 'add new brand' button
        document.querySelector('#brands').style.display = 'none';
        // Hide 'add new product' button
        document.querySelector('#category').style.display = 'none';
        document.querySelector('#virals').style.display = 'block';
        document.querySelector('#packs').style.display = 'none';
        await gsap.from('#virals_table_stagger', {
            y: '-2rem',
            opacity: 0,
            delay: 0.5,
            stagger: 0.3
        });
    }
}

function closeDetails(e, element) {
    // e.stopPropagation();
    if (element === 'edit_category') {
        const element = document.querySelector('.edit_category.flex_column');
        element.style.transform = 'scale(0)';
    } else if (element === 'edit_brand') {
        const element = document.querySelector('.edit_category.edit_brand.flex_column');
        element.style.transform = 'scale(0)';
    } else if (element === 'edit_pack') {
        const element = document.querySelector('.edit_category.edit_pack.flex_column');
        element.style.transform = 'scale(0)';
    } else if (element === 'edit_virals') {
        const element = document.querySelector('.edit_category.edit_virals.flex_column');
        element.style.transform = 'scale(0)';
    } else {
        requestAnimationFrame(() => {
            popup.style.transform = 'scale(0)';
        });
        setTimeout(() => {
            popup.style.display = 'none';
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    addAnimations();
});

function addAnimations() {
    gsap.from('.sidebar', {
        x: '-4rem',
        opacity: 0,
        duration: 0.5
    });

    gsap.from('#stagger', {
        y: '-2rem',
        opacity: 0,
        stagger: 0.3
    });

    gsap.from('#product_table_stagger', {
        y: '-2rem',
        opacity: 0
    });

    // gsap.from('#chart_stagger', {
    //     y: '-2rem',
    //     opacity: 0,
    //     delay: 1,
    //     stagger: 0.3
    // });

    // gsap.from('.order_details', {
    //     y: '-2rem',
    //     opacity: 0,
    //     duration: 0.5
    // });
}

async function getFileNameWithExt(event) {
   const contentType = 'image/png';
   var b64Data
   console.log(event.target.files[0],"FFFFFFFFFFFFFFFFFFf");
   var reader = new FileReader();
   reader.readAsBinaryString(event.target.files[0]);

   reader.onload = function() {
    //    console.log(btoa(reader.result));
       b64Data = btoa(reader.result)
       localStorage.setItem('CategoryImage', btoa(reader.result).toString())
   };

   reader.onerror = function() {
       console.log('there are some problems');
   };


//    const byteCharacters = atob(b64Data);
//    const byteArrays = [];

//    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
//     const slice = byteCharacters.slice(offset, offset + sliceSize);

//     const byteNumbers = new Array(slice.length);
//     for (let i = 0; i < slice.length; i++) {
//       byteNumbers[i] = slice.charCodeAt(i);
//     }

//     const byteArray = new Uint8Array(byteNumbers);
//     byteArrays.push(byteArray);
//   }

//     const blob = new Blob(byteArrays, {type: contentType});
//     const blobUrl = URL.createObjectURL(blob);
//     const img = document.createElement('img');
//     img.src = blobUrl;
//     console.log(blob, blobUrl, img);
    // Goes(event.target.files[0]);
}

async function BrandImg(event) {
    const contentType = 'image/png';
    var b64Data
    console.log(event.target.files[0],"FFFFFFFFFFFFFFFFFFf");
    var reader = new FileReader();
    reader.readAsBinaryString(event.target.files[0]);
 
    reader.onload = function() {
        b64Data = btoa(reader.result)
        localStorage.setItem('BrandImage', btoa(reader.result).toString())
        document.getElementById('bradimg').value = btoa(reader.result);
        document.getElementById('bradimgs').src = `data:image/png;base64, ${btoa(reader.result)}`
        document.getElementById('bradimgs').style.height = "85px"
        document.getElementById('bradimgs').style.width = "85px"
    };
 
    reader.onerror = function() {
        console.log('there are some problems');
    };
}

async function Goes(data) {
    var profile = JSON.parse(localStorage.getItem('Login')); 
    console.log(data,"DDDDDDDDDDDDDDDDDDDDDD")
    var datas = {
        "name": "Testings",
        "image": data
    }
    console.log(datas, JSON.stringify(datas));
    try {
      const response = await fetch('https://eloroverde-pjc5.onrender.com/products/category', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer '+profile.token
        },
        body: JSON.stringify(datas)
      });
      const result = await response.json();
      console.log("Response:", result);
    } catch (error) {
      console.error("Error:", error);
    }
}

function goes() {
    myInterval = setInterval(sets, 1000);
    return myInterval
}

function goes1() {
    myInterval1 = setInterval(setsBrand, 1000);
    return myInterval1
}

function goes2() {
    myInterval2 = setInterval(setsCatWithData, 1000);
    return myInterval2
}

function goes3() {
    myInterval3 = setInterval(setsSubCatWithData, 1000);
    return myInterval3
}

function goes4() {
    myInterval4 = setInterval(setsProWithData, 1000);
    return myInterval4
}

function goe1() {
    myInterval5 = setInterval(setsPacks, 1000);
    return myInterval5
}

function goe2() {
    myInterval6 = setInterval(setsVirals, 1000);
    return myInterval6
}

function sets() {
    localStorage.removeItem('propage')
    var text = "";
    var data = JSON.parse(localStorage.getItem('Category'));
    if (data.length != 0) {
        for (var i = 0; i <=4; i++) {
            text = text + `<div class="values flex_row space_between center" id="product_table_stagger">
            <div class="image flex_row center">
                <img src="data:image/png;base64, ${data[i].image}" alt="">
            </div>
            <p value="${i}" onclick="{setCatData(this);showDetails(event, 'category')}">${data[i].name}</p>
            <p>${data[i].totalproduct}</p>
            <p id="success">${data[i].stock}</p>
            <p>#${data[i].sku}</p>
            <div class="action flex_row space_between center">
                <button value="${i}" onclick="showDetails(event, 'edit_category', this)"><img src="../images/edit_yellow.png" alt=""></button>
                <button value="${i}" onclick="deleteProduct(event, 'delete_category', this)"><img src="../images/delete_outline_black_24dp 1.png" alt=""></button>
            </div>
            </div>`+ '\n'
            }
            console.log(text, "TTTTTTTTTTTTTTTT");
            document.getElementById("datass").innerHTML = text;
            clearInterval(myInterval);
    }
}

function setsPacks() {
    var text = "";
    var data = JSON.parse(localStorage.getItem('Packs'));
    if (data.length != 0) {
        for (var i = 0; i < data.length; i++) {
            text = text + `<div class="values flex_row space_between center" id="pack_table_stagger">
            <div class="image flex_row center">
                <img src="data:image/png;base64, ${data[i].image}" alt="">
            </div>
            <p value="${i}" onclick="showDetails(event, 'second_category')">${data[i].name}</p>
            <p>1</p>
            <p id="success">${data[i].stock}</p>
            <p>${data[i].totalproduct}</p>
            <div class="action flex_row space_between center">
                <button value="${data[i]._id}" onclick="showDetails(event, 'add_pack')"><img src="../images/edit_yellow.png" alt=""></button>
                <button><img src="../images/delete_outline_black_24dp 1.png" alt=""></button>
            </div>
            </div>`+ '\n'
            }
            console.log(text, "TTTTTTTTTTTTTTTT");
            document.getElementById("packks").innerHTML = text;
            clearInterval(myInterval5);
    }
}

function setsVirals() {
    var text = "";
    var data = JSON.parse(localStorage.getItem('Virals'));
    if (data.length != 0) {
        for (var i = 0; i < data.length; i++) {
            text = text + `<div class="values flex_row space_between center" id="virals_table_stagger">
            <div class="image flex_row center">
                <img src="data:image/png;base64, ${data[i].image}" alt="">
            </div>
            <p>${data[i].product_name}</p>
            <p>${data[i].views}</p>
            <p id="success">${data[i].stock}</p>
            <p>${i+1}</p>
            <div class="action flex_row space_between center">
                <button onclick="showDetails(event, 'product_details')"><img src="../images/edit_yellow.png" alt=""></button>
                <button><img src="../images/delete_outline_black_24dp 1.png" alt=""></button>
            </div>
            </div>`+ '\n'
            }
            console.log(text, "TTTTTTTTTTTTTTTT");
            document.getElementById("vir").innerHTML = text;
            clearInterval(myInterval6);
    }
}

function setsCatWithData() {
    var data = JSON.parse(localStorage.getItem('CategoryWithData'));
    console.log(data,"DDDDDDDDDDDDD");
    clearInterval(myInterval2);
}

function SubCatWithData(id) {
    var data = JSON.parse(localStorage.getItem('Login'));
    Gets(
        {
            method: 'GET',
            urls: `products/subcategorywithdata/${id}`,
            headerss: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer '+data.token
            },
            actions: '',
            saving: 'SubCategoryWithData'
        }
    );
    goes3();
}

function ProWithData(id) {
    var data = JSON.parse(localStorage.getItem('Login'));
    Gets(
        {
            method: 'GET',
            urls: `products/productsbyid/${id}`,
            headerss: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer '+data.token
            },
            actions: '',
            saving: 'ProductsWithData'
        }
    );
    goes4();
}

function setsSubCatWithData() {
    var text = "";
    var data = JSON.parse(localStorage.getItem('SubCategoryWithData'));
    if (data.data.subcategorys.length != 0) {
        for (var i = 0; i <data.data.subcategorys.length; i++) {
            text = text + `<div class="values flex_row space_between center" id="product_details_table_stagger">
            <div class="image flex_row center">
                <img src="data:image/png;base64, ${data.data.subcategorys[i].image}">
            </div>
            <p value="${data.data.subcategorys[i]._id}" onclick="{setProData(this);showDetails(event, 'third_category')}">${data.data.subcategorys[i].name}</p>
            <p>1</p>
            <div class="product_detail">
                <p>Lorem, ipsum.</p>
            </div>
            <p>€ 20</p>
            <p id="success">In Stock</p>
            <p>#2056</p>
            <div class="action flex_row space_between center">
                <button value="${i}" onclick="showDetails(event, 'edit_category')"><img src="../images/edit_yellow.png" alt=""></button>
                <button value="${i}" onclick="showDetails(event, 'edit_category')"><img src="../images/delete_outline_black_24dp 1.png" alt=""></button>
            </div>
            </div>`+ '\n'
            }
            console.log(text, "TTTTTTTTTTTTTTTT");
            document.getElementById("subcatss").innerHTML = text;
            clearInterval(myInterval3);
    }
}

function setsProWithData() {
    var text = "";
    var data = JSON.parse(localStorage.getItem('ProductsWithData'));
    if (data.products.length != 0) {
        for (var i = 0; i <data.products.length; i++) {
            text = text + `<div class="values flex_row space_between center" id="product_details_table_stagger">
            <div class="image flex_row center">
                <img src="data:image/png;base64, ${data.products[i].image}">
            </div>
            <p>${data.products[i].name}</p>
            <div class="product_detail">
                <p>${data.products[i].description}</p>
            </div>
            <p>${data.products[i].purchaseprice}</p>
            <p id="success">In Stock</p>
            <p>#${data.products[i].sku}</p>
            <div class="action flex_row space_between center">
                <button value="${data.products[i]._id}" onclick="showDetails(event, 'product_details')"><img src="../images/edit_yellow.png" alt=""></button>
                <button value="${data.products[i]._id}"><img src="../images/delete_outline_black_24dp 1.png" alt=""></button>
            </div>
            </div>`+ '\n'
            }
            console.log(text, "TTTTTTTTTTTTTTTT");
            document.getElementById("prodss").innerHTML = text;
            clearInterval(myInterval4);
    }
}

function setCatData(val) {
    var ind = parseInt(val.getAttribute('value'));
    var data = JSON.parse(localStorage.getItem('Category'));
    var data1 = JSON.parse(localStorage.getItem('CategoryWithData'));
    var text = "";
    console.log(val, val.getAttribute('value'),"VVVVVVVVVVVVVVV")
    var ids = data[ind].id
    // var sets
    if (data1.data.length != 0) {
        for(var i = 0; i<data1.data.length; i++)
        {
            if(data1.data[i].category._id==ids)
            {
                for(var j = 0; j<data1.data[i].subcategory.length; j++)
                {
                    text = text + `<div class="values flex_row space_between center" id="product_details_table_stagger">
                    <div class="image flex_row center">
                        <span></span>
                    </div>
                    <p value=${[i, j]} onclick="{showDetails(event, 'second_category');setSubDatass(event, 'add_brand', this)}">${data1.data[i].subcategory[j].name}</p>
                    <p>1</p>
                    <div class="product_detail">
                        <p>Lorem, ipsum.</p>
                    </div>
                    <p>€ 20</p>
                    <p id="success">${data1.data[i].category.stock}</p>
                    <p>#${data1.data[i].category.sku}</p>
                    <div class="action flex_row space_between center">
                        <button value=${[i, j]} onclick="showDetails(event, 'edit_category', this);setSubData(event, 'add_brand', this);"><img src="../images/edit_yellow.png" alt=""></button>
                        <button value=${[i, j]} onclick="deleteSub(event, 'edit_category', this)"><img src="../images/delete_outline_black_24dp 1.png" alt=""></button>
                    </div>
                    </div>`+ '\n'
                }
            }
        }
        console.log(text, "TTTTTTTTTTTTTTTT");
        document.getElementById("subs").innerHTML = text;
    }
}

function setsBrand() {
    // localStorage.removeItem('propage')
    var text = "";
    var data = JSON.parse(localStorage.getItem('Brand'));
    console.log(data,"DDDDDDDDDDDDDDDD");
    if (data.length != 0) {
        var n = ( data.length < 4 ) ? data.length : 4
        for (var i = 0; i < n; i++) {
            text = text + `<div class="values flex_row space_between center" id="brand_table_stagger">
            <div class="image flex_row center">
                <img src="data:image/png;base64, ${data[i].image}" alt="">
            </div>
            <p onclick="showDetails(event, 'third_category')">${data[i].name}</p>
            
            <div class="action flex_row space_between center">
                <button value=${i} onclick="{showDetails(event, 'add_brand', this);setData(event, 'add_brand', this);}"><img src="../images/edit_yellow.png" alt=""></button>
                <button value=${i} onclick="deleteBrand(event, 'add_brand', this)"><img src="../images/delete_outline_black_24dp 1.png" alt=""></button>
            </div>
            </div>`+ '\n'
            }
            console.log(text, "TTTTTTTTTTTTTTTT");
            document.getElementById("dat").innerHTML = text;
            clearInterval(myInterval1);
    }
}

function nexts() {
    // localStorage.removeItem('propage')
    var data = JSON.parse(localStorage.getItem('Category'));
    var num, num1
    const pages = localStorage.getItem('propage')
    if(pages!=null) {
        if(parseInt(pages)+5<data.length) 
        {
            num = parseInt(pages);
            num1 = parseInt(pages)+5;
            localStorage.setItem('propage', (parseInt(pages)+5).toString())
        }
        else
        {
            num = parseInt(pages);
            num1 = data.length
            loops(num, num1);
        }
        
    }
    else {
        localStorage.setItem('propage', '5')
        num = 0;
        num1 = 5;
        loops(num, num1);
    }
    console.log(num, num1,pages)
}

function prevs() {

    var num, num1
    const pages = localStorage.getItem('propage')
    if(pages!=null) {
        if(parseInt(pages)-5>=0) {
            num = parseInt(pages)-5
            num1 = parseInt(pages);
            loops(num, num1);
        }
        else
        {
            num=0
            num1=5
            loops(num, num1);
        }
    }
    else
    {
        localStorage.setItem('propage', '5');
        num=0
        num1=5
        loops(num, num1);
    }
    console.log(num, num1,pages)
    
}

async function loops(num, num1) {
    var text = "";
    var data = JSON.parse(localStorage.getItem('Category'));
    if (data.length != 0) {
        for (var i = num; i < num1; i++) {
            text = text + `<div class="values flex_row space_between center" id="product_table_stagger">
            <div class="image flex_row center">
                <img src="data:image/png;base64, ${data[i].image}" alt="">
            </div>
            <p onclick="showDetails(event, 'category')">${data[i].name}</p>
            <p>${data[i].totalproduct}</p>
            <p id="success">${data[i].stock}</p>
            <p>#${data[i].sku}</p>
            <div class="action flex_row space_between center">
                <button value="${i}" onclick="showDetails(event, 'edit_category', this)"><img src="../images/edit_yellow.png" alt=""></button>
                <button value="${i}" onclick="deleteProduct(event, 'delete_category', this)"><img src="../images/delete_outline_black_24dp 1.png" alt=""></button>
            </div>
            </div>`+ '\n'
            }
            console.log(text, "TTTTTTTTTTTTTTTT");
            if(document.getElementById("datass") != null){
                document.getElementById("datass").innerHTML = text;
            }
            clearInterval(myInterval);
    }
}

async function deleteProduct(event, title, val) {
    console.log(event, val, "DDDDDDDDDD");
    var ind = parseInt(val.value);
    var profile = JSON.parse(localStorage.getItem('Login'));
    var data = JSON.parse(localStorage.getItem('Category'));
    var id = data[ind].id
    try {
        const response = await fetch(BASE_URL + 'products/category/'+id, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer '+profile.token
          },
        });
        const result = await response.json();
        localStorage.setItem('Category','');
        console.log("Response:", result);
        if(Object.keys(result).length === 0 && result.constructor === Object)
        {
            window.location.reload();
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

async function EditProduct() {
    const element = document.querySelector('.edit_category.flex_column');
    console.log(element.querySelector('h1').innerHTML,"IIIIIIIIIIIIIIIIIIIII");
    if(element.querySelector('h1').innerHTML=='Add Category')
    {
        AddProduct();
    }
    else if(element.querySelector('h1').innerHTML=='Edit Category')
    {
        var ind = localStorage.getItem('ind')
        var profile = JSON.parse(localStorage.getItem('Login'));
        var data = JSON.parse(localStorage.getItem('Category'));
        var id = data[ind].id
        var sets = {}
        data[ind].name == document.getElementById('cate').value ? null : sets.name = document.getElementById('cate').value
        data[ind].totalproduct == document.getElementById('totpro').value ? null : sets.totalproduct = document.getElementById('totpro').value
        data[ind].stock == document.getElementById('stock').value ? null : sets.stock = document.getElementById('stock').value
        data[ind].sku == document.getElementById('sku').value ? null : sets.sku = document.getElementById('sku').value
        data[ind].image == document.getElementById('cateimg').value ? null : sets.image = document.getElementById('cateimg').value
        
        console.log(Object.keys(sets).length === 0 && sets.constructor === Object, ind, profile, data, id)
        if(!(Object.keys(sets).length === 0 && sets.constructor === Object))
        {
        var bod = {
            "id": id,
            "new": sets
        }
        try {
            const response = await fetch(BASE_URL + 'products/updatecategory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer '+profile.token
            },
            body: JSON.stringify(bod)
            });
            const result = await response.json();
            localStorage.setItem('Category','');
            console.log("Response:", result);
            window.location.reload();
        } catch (error) {
            console.error("Error:", error);
        }
        }
    }
}

async function AddProduct(event, val, i) {
    var imgs = localStorage.getItem('CategoryImage')
    let datas = {
        name: document.getElementById('cate').value,
        totalproduct: document.getElementById('totpro').value,
        stock: document.getElementById('stock') && document.getElementById('stock').value ? document.getElementById('stock').value : 'In Stock',
        sku: document.getElementById('sku').value,
        image: imgs
    }
    console.log(datas)
    var profile = JSON.parse(localStorage.getItem('Login'));
    try {
        const response = await fetch(BASE_URL + 'products/category', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer '+profile.token
          },
          body: JSON.stringify(datas)
        });
        const result = await response.json();
        localStorage.setItem('Category','');
        console.log("Response:", result);
        if(result.success)
        {
            window.location.reload();
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

async function deleteBrand(event, title, val) {
    console.log(event, val, "DDDDDDDDDD");
    var ind = parseInt(val.value);
    var profile = JSON.parse(localStorage.getItem('Login'));
    var data = JSON.parse(localStorage.getItem('Brand'));
    var id = data[ind].id
    try {
        const response = await fetch(BASE_URL + 'products/brand/'+id, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer '+profile.token
          },
        });
        const result = await response.json();
        localStorage.setItem('Brand','');
        console.log("Response:", result);
        if(Object.keys(result).length === 0 && result.constructor === Object)
        {
            // window.location.reload();
            Gets(
                {
                    method: 'GET',
                    urls: 'products/brands',
                    headerss: {
                        'Content-Type': 'application/json',
                        'authorization': 'Bearer '+profile.token
                    },
                    actions: '',
                    saving: 'Brand'
                }
                );
            goes1();
            // closeDetails('', 'edit_brand')
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

async function EditBrand() {

    console.log(document.getElementById('bradimg'))
    const element = document.querySelector('.edit_category.edit_brand.flex_column');
    console.log(element.querySelector('h1').innerHTML,"IIIIIIIIIIIIIIIIIIIII");
    if(element.querySelector('h1').innerHTML=='Add Brand')
    {
        AddBrand();
    }
    else if(element.querySelector('h1').innerHTML=='Edit Brand')
    {
        var imgs = localStorage.getItem('BrandImage');
        var ind = localStorage.getItem('brandind');
        var profile = JSON.parse(localStorage.getItem('Login'));
        var data = JSON.parse(localStorage.getItem('Brand'));
        var id = data[ind].id;
        var sets = {};
        data[ind].name == document.getElementById('bradname').value ? null : sets.name = document.getElementById('bradname').value;
        data[ind].image == document.getElementById('bradimg').value ? null : sets.image = imgs;
        console.log(Object.keys(sets).length === 0 && sets.constructor === Object, ind, profile, data, id)
        if(!(Object.keys(sets).length === 0 && sets.constructor === Object))
        {
        var bod = {
            "id": id,
            "new": sets
        }
        console.log(bod,"BBBBBBBBBBBBBB");
        try {
            const response = await fetch(BASE_URL + 'products/updatebrand', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer '+profile.token
            },
            body: JSON.stringify(bod)
            });
            const result = await response.json();
            localStorage.setItem('Category','');
            console.log("Response:", result);
            // window.location.reload();
            Gets(
                {
                    method: 'GET',
                    urls: 'products/brands',
                    headerss: {
                        'Content-Type': 'application/json',
                        'authorization': 'Bearer '+profile.token
                    },
                    actions: '',
                    saving: 'Brand'
                }
            );
            goes1();
            closeDetails('', 'edit_brand')
        } catch (error) {
            console.error("Error:", error);
        }
        }
    }
}

async function AddBrand() {
    var imgs = localStorage.getItem('BrandImage')
    let datas = {
        name: document.getElementById('bradname').value,
        image: imgs
    }
    console.log(datas)
    var profile = JSON.parse(localStorage.getItem('Login'));
    try {
        const response = await fetch(BASE_URL + 'products/brand', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer '+profile.token
          },
          body: JSON.stringify(datas)
        });
        const result = await response.json();
        localStorage.setItem('Brand','');
        console.log("Response:", result);
        if(result.success)
        {
            // window.location.reload();
            Gets(
                {
                    method: 'GET',
                    urls: 'products/brands',
                    headerss: {
                        'Content-Type': 'application/json',
                        'authorization': 'Bearer '+profile.token
                    },
                    actions: '',
                    saving: 'Brand'
                }
                );
            goes1();
            closeDetails('', 'edit_brand')
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

async function setData(event, title, val) {
    console.log(event, val, "DDDDDDDDDD");
    var ind = parseInt(val.value);
    localStorage.setItem('brandind', ind);
    var data = JSON.parse(localStorage.getItem('Brand'));
    document.getElementById('bradname').value = data[ind].name
    document.getElementById('bradimg').value = data[ind].image
    document.getElementById('bradimgs').src = `data:image/png;base64, ${data[ind].image}`
    document.getElementById('bradimgs').style.height = "85px"
    document.getElementById('bradimgs').style.width = "85px"
    console.log(data[ind].image, document.getElementById('bradimg').value);
}

async function setSubData(event, title, val) {
    console.log(event, val, val.value, val.value[0], val.value[1], "DDDDDDDDDD");
    var ind = parseInt(val.value);
    localStorage.setItem('brandind', ind);
    var data = JSON.parse(localStorage.getItem('CategoryWithData'));
    document.getElementById('bradname').value = data.data[val.value[0]].subcategory[val.value[1]].name
}

async function setSubDatass(event, title, val) {
    var inds = val.getAttribute('value').split(',');
    console.log(event, val, inds[0], inds[1], "DDDDDDDDDD");
    // var ind = parseInt(val.value);
    // localStorage.setItem('brandind', ind);
    var data = JSON.parse(localStorage.getItem('CategoryWithData'));
    console.log(data.data[inds[0]].subcategory, data.data[inds[0]].subcategory[inds[1]].name)
    SubCatWithData(data.data[inds[0]].subcategory[inds[1]]._id)
}

async function setProData(val) {
    console.log(val);
    var inds = val.getAttribute('value');
    console.log(event, val, "DDDDDDDDDD");
    ProWithData(inds)
}
