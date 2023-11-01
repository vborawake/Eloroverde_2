const popup = document.querySelector('.edit_category.flex_column');
const details = document.querySelector('.details.popup.flex_column');
const right_section = document.querySelector('.right_section.flex_column');
var myInterval, myInterval1, myInterval2, myInterval3, myInterval4, myInterval5, myInterval6
// const BASE_URL = 'https://eloroverde-pjc5.onrender.com/' 
var datas = JSON.parse(localStorage.getItem('Login'));
var data = []
var brand = []
var packs = []
var virals = []
var catwithdata
var Langs = {}
var SubCategoryWithData = []
var prowithdata = []

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
    console.log(e.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement, e.currentTarget, document.querySelector('.main_category button#category'), e.currentTarget.parentElement.parentElement.parentElement.parentElement.classList, "CCCCCCCCCCCCCCCCCCCCCCCCC")
    e.stopPropagation();
    if (element === 'edit_category') {
        const element = document.querySelector('.edit_category.flex_column');
        element.style.display = 'flex';
        setTimeout(() => { element.style.transform = 'scale(1)'; });
        element.querySelector('h1').innerHTML = 'Edit Category';
        element.querySelector('.input.flex_column:nth-child(2) input').placeholder = e.currentTarget.parentElement.parentElement.querySelector('p:nth-child(2)').innerHTML;
        if ((document.querySelector('.main_category button#category') === e.currentTarget) || (e.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.classList.contains('main_category'))) {
            element.querySelector('h1').innerHTML = 'Edit Main Category';
            element.querySelector('p:nth-child(1)').innerHTML = 'New Category Name';
            element.querySelector('.category_name').style.display = 'none';
            element.querySelector('.subcategory_name').style.display = 'none';
        } else if (e.currentTarget.parentElement.parentElement.parentElement.parentElement.classList.contains('first_subcategory')) {
            element.querySelector('h1').innerHTML = 'Edit Subcategory';
            element.querySelector('p:nth-child(1)').innerHTML = 'New Subcategory Name';
            element.querySelector('.input .image_input').parentElement.style.display = 'none';
            element.querySelector('.input .image_input').parentElement.insertAdjacentElement('beforebegin', element.querySelector('.category_name'));
            element.querySelector('.category_name').style.display = 'flex';
        } else {
            element.querySelector('h1').innerHTML = 'Edit Second Subcategory';
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
            element.querySelector('h1').innerHTML = 'Add Second Subcategory';
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
        if (e.currentTarget.innerText === 'Add New Product' || e.currentTarget.innerText === 'Add New Viral') {
            document.querySelector('.details.popup').querySelector('.header p').innerHTML = 'Back &gt; Add Product';
            document.querySelector('.final_categories').style.display = 'none';
            if (document.getElementById('products_tab').classList.contains('active') || document.getElementById('packs_tab').classList.contains('active')) document.querySelector('.final_categories').style.display = 'flex';
            document.querySelectorAll('.details.popup input').forEach(input => input.placeholder = '');
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
        document.querySelectorAll('.edit_category.edit_brand.flex_column input').forEach(input => {if (input.type !== 'file') input.placeholder = ''});
        element.style.display = 'flex';
        setTimeout(() => { element.style.transform = 'scale(1)'; });
        element.querySelector('h1').innerHTML = 'Add Brand';
        document.querySelector('#image_input').style.display = 'none';
        if (document.querySelector('.main_category button#brands') === e.currentTarget) element.querySelector('h1').innerHTML = 'Add Brand';
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
        if (document.querySelector('.main_category button#packs') === e.currentTarget) element.querySelector('h1').innerHTML = 'Add Pack';
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
       document.getElementById('cateimg').value = btoa(reader.result).toString()
    //    localStorage.setItem('CategoryImage', btoa(reader.result).toString())
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
    var text = "";
    Gets(
        {
            method: 'GET',
            urls: 'products/category/'+datas._id,
            headerss: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer '+datas.token
            },
            actions: '',
            // saving: 'Category'
        }
        ).then((res)=>{
            console.log(res, "RRRRRRRRRRR");
            data = res.data
            for (var i = 0; i < data.length; i++) {
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
        })
}

function goes1() {
    var text = "";
    Gets(
        {
            method: 'GET',
            urls: 'products/brands/'+datas._id,
            headerss: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer '+datas.token
            },
            actions: '',
            // saving: 'Brand'
        }
    ).then((res)=> {
        console.log(res, "BBBBBBBBBBBBBBB")
        brand = res.data
        var n = ( brand.length < 4 ) ? brand.length : 4
        for (var i = 0; i < brand.length; i++) {
            text = text + `<div class="values flex_row space_between center" id="brand_table_stagger">
            <div class="image flex_row center">
                <img src="data:image/png;base64, ${brand[i].image}" alt="">
            </div>
            <p onclick="showDetails(event, 'third_category')">${brand[i].name}</p>
            
            <div class="action flex_row space_between center">
                <button value=${i} onclick="{showDetails(event, 'add_brand', this);setData(event, 'add_brand', this);}"><img src="../images/edit_yellow.png" alt=""></button>
                <button value=${i} onclick="deleteBrand(event, 'add_brand', this)"><img src="../images/delete_outline_black_24dp 1.png" alt=""></button>
            </div>
            </div>`+ '\n'
            }
            console.log(text, "TTTTTTTTTTTTTTTT");
            if (text === '') text = `<p style='font-size: 1.5rem; padding: 2rem 0; color: #E7B82A; font-weight: 600; text-align: center;'>No Data Found</p>`
            document.getElementById("dat").innerHTML = text;
    })
    // myInterval1 = setInterval(setsBrand, 1000);
    // return myInterval1
}

function goes2() {
    Gets(
        {
            method: 'GET',
            urls: 'products/categorywithdata',
            headerss: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer '+datas.token
            },
            actions: '',
            // saving: 'CategoryWithData'
        }
        ).then((res)=> {
            console.log(res, "CCCCWWWDDD")
            catwithdata = res
        })
        // var data = JSON.parse(localStorage.getItem('CategoryWithData'));
    // myInterval2 = setInterval(setsCatWithData, 1000);
    // return myInterval2
}

function goes3() {
    myInterval3 = setInterval(setsSubCatWithData, 1000);
    return myInterval3
}

// function goes4() {
//     myInterval4 = setInterval(setsProWithData, 1000);
//     return myInterval4
// }

function goe1() {
    var text = ""
    Gets(
        {
            method: 'GET',
            urls: 'products/packs',
            headerss: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer '+datas.token
            },
            actions: '',
            // saving: 'Packs'
        }
        ).then((res)=> {
            console.log(res, "PPAACCKKSS")
            packs = res
            for (var i = 0; i < packs.length; i++) {
                text = text + `<div class="values flex_row space_between center" id="pack_table_stagger">
                <div class="image flex_row center">
                    <img src="data:image/png;base64, ${packs[i].image}" alt="">
                </div>
                <p value="${i}" onclick="showDetails(event, 'second_category')">${packs[i].name}</p>
                <p>1</p>
                <p id="success">${packs[i].stock}</p>
                <p>${packs[i].totalproduct}</p>
                <div class="action flex_row space_between center">
                    <button value="${packs[i]._id}" onclick="showDetails(event, 'add_pack')"><img src="../images/edit_yellow.png" alt=""></button>
                    <button><img src="../images/delete_outline_black_24dp 1.png" alt=""></button>
                </div>
                </div>`+ '\n'
                }
                console.log(text, "TTTTTTTTTTTTTTTT");
                document.getElementById("packks").innerHTML = text;  
        })
    // myInterval5 = setInterval(setsPacks, 1000);
    // return myInterval5
}

function goe2() {
    var text = ''
    Gets(
        {
            method: 'GET',
            urls: 'products/virals/'+datas._id,
            headerss: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer '+datas.token
            },
            actions: '',
            // saving: 'Virals'
        }
        ).then((res)=> {
            // console.log(res, "VVVVVVVVVVVVVVVVV")
            virals = res.data
            console.log(res, "Viralssssss")
            for (var i = 0; i < virals.length; i++) {
                text = text + `<div class="values flex_row space_between center" id="virals_table_stagger">
                <div class="image flex_row center">
                    <img src="data:image/png;base64, ${virals[i].image}" alt="">
                </div>
                <p>${virals[i].product_name}</p>
                <p>${virals[i].views}</p>
                <p id="success">${virals[i].stock}</p>
                <p>${i+1}</p>
                <div class="action flex_row space_between center">
                    <button onclick="showDetails(event, 'product_details')"><img src="../images/edit_yellow.png" alt=""></button>
                    <button><img src="../images/delete_outline_black_24dp 1.png" alt=""></button>
                </div>
                </div>`+ '\n'
                }
                console.log(text, "TTTTTTTTTTTTTTTT");
                document.getElementById("vir").innerHTML = text;
        })
    // myInterval6 = setInterval(setsVirals, 1000);
    // return myInterval6
}

// function sets() {
//     localStorage.removeItem('propage')
//     var text = "";
//     var data = JSON.parse(localStorage.getItem('Category'));
//     if (data.length != 0) {
//         for (var i = 0; i <=4; i++) {
//             text = text + `<div class="values flex_row space_between center" id="product_table_stagger">
//             <div class="image flex_row center">
//                 <img src="data:image/png;base64, ${data[i].image}" alt="">
//             </div>
//             <p value="${i}" onclick="{setCatData(this);showDetails(event, 'category')}">${data[i].name}</p>
//             <p>${data[i].totalproduct}</p>
//             <p id="success">${data[i].stock}</p>
//             <p>#${data[i].sku}</p>
//             <div class="action flex_row space_between center">
//                 <button value="${i}" onclick="showDetails(event, 'edit_category', this)"><img src="../images/edit_yellow.png" alt=""></button>
//                 <button value="${i}" onclick="deleteProduct(event, 'delete_category', this)"><img src="../images/delete_outline_black_24dp 1.png" alt=""></button>
//             </div>
//             </div>`+ '\n'
//             }
//             console.log(text, "TTTTTTTTTTTTTTTT");
//             document.getElementById("datass").innerHTML = text;
//             clearInterval(myInterval);
//     }
// }

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

// function setsCatWithData() {
//     var data = JSON.parse(localStorage.getItem('CategoryWithData'));
//     console.log(data,"DDDDDDDDDDDDD");
//     clearInterval(myInterval2);
// }

function SubCatWithData(id) {
    var text = '';
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
            // saving: 'SubCategoryWithData'
        }
    ).then((res)=> {
        console.log(res, "SubCategoryWithData")
        SubCategoryWithData = res.data
        console.log(SubCategoryWithData.subcategorys,"SUSUSUSUSUSUSUSUSU")
        for (var i = 0; i <SubCategoryWithData.subcategorys.length; i++) {
            text = text + `<div class="values flex_row space_between center" id="product_details_table_stagger">
            <div class="image flex_row center">
                <img src="data:image/png;base64, ${SubCategoryWithData.subcategorys[i].image}">
            </div>
            <p value="${SubCategoryWithData.subcategorys[i]._id}" onclick="{setProData(this);showDetails(event, 'third_category')}">${SubCategoryWithData.subcategorys[i].name}</p>
            <p>1</p>
            <div class="product_detail">
                <p>Lorem, ipsum.</p>
            </div>
            <p>€ 20</p>
            <p id="success">In Stock</p>
            <p>#2056</p>
            <div class="action flex_row space_between center">
            <button value="${SubCategoryWithData.subcategorys[i]._id}" onclick="{setProDatas(${i},this);showDetails(event, 'edit_category')}"><img src="../images/edit_yellow.png" alt=""></button>
                <button value="${i}" onclick="showDetails(event, 'edit_category')"><img src="../images/delete_outline_black_24dp 1.png" alt=""></button>
            </div>
            </div>`+ '\n'
            }
            console.log(text, "TTTTTTTTTTTTTTTT");
            document.getElementById("subcatsss").innerHTML = text;
    })
    // goes3();
}

function ProWithData(id) {
    var data = JSON.parse(localStorage.getItem('Login'));
    
    Gets(
        {
            method: 'GET',
            urls: `products/productsbyid/${id}`+'/'+data._id,
            headerss: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer '+data.token
            },
            actions: '',
            // saving: 'ProductsWithData'
        }
    ).then((res)=> {
        // prowithdata = res.products
        console.log(res, "PPPPRRRRPPPPRRRR")
        setsProWithData(res)
    })
    // goes4();
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
                <button value="${data.data.subcategorys[i]._id}" onclick="{setProDatas(${i},${data.data.subcategorys[i]._id});showDetails(event, 'edit_category')}"><img src="../images/edit_yellow.png" alt=""></button>
                <button value="${i}" onclick="showDetails(event, 'edit_category')"><img src="../images/delete_outline_black_24dp 1.png" alt=""></button>
            </div>
            </div>`+ '\n'
            }
            console.log(text, "TTTTTTTTTTTTTTTT");
            document.getElementById("subcatss").innerHTML = text;
            clearInterval(myInterval3);
    }
}

function setsProWithData(data) {
    var text = "";
    console.log(data, "DDDDDDDDDDDDDDDDDDDDDD")
    if (data.arr.length != 0) {
        for (var i = 0; i < data.arr.length; i++) {
            var imgss = ''
            if(data.arr[i].image.includes('['))
            {
                var im = JSON.parse(data.arr[i].image.replace(/'/g, '"'))
                imgss = im[0]
            }
            else
            {
                imgss = data.arr[i].image
            }
            text = text + `<div class="values flex_row space_between center" id="product_details_table_stagger">
            <div class="image flex_row center">
                <img src="data:image/png;base64, ${imgss}">
            </div>
            <p>${data.arr[i].name}</p>
            <div class="product_detail">
                <p>${data.arr[i].description}</p>
            </div>
            <p>${data.arr[i].purchaseprice}</p>
            <p id="success">In Stock</p>
            <p>#${data.arr[i].sku}</p>
            <div class="action flex_row space_between center">
                <button value="${data.arr[i]._id}" onclick="showDetails(event, 'product_details')"><img src="../images/edit_yellow.png" alt=""></button>
                <button value="${data.arr[i]._id}"><img src="../images/delete_outline_black_24dp 1.png" alt=""></button>
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
    var data1 = catwithdata
    var text = "";
    console.log(val, val.getAttribute('value'), data1, "VVVVVVVVVVVVVVV")
    var ids = data[ind].id
    document.getElementById('catid').innerHTML = ids
    document.getElementById('catind').innerHTML = ind
    document.getElementById('catss').value = data[ind].name
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
                        <button value=${[i, j, data1.data[i].subcategory[j].id]} onclick="showDetails(event, 'edit_category', this);setSubData(event, 'add_brand', this);"><img src="../images/edit_yellow.png" alt=""></button>
                        <button value=${[i, j, data1.data[i].subcategory[j].id]} onclick="deleteSub(event, 'edit_category', this)"><img src="../images/delete_outline_black_24dp 1.png" alt=""></button>
                    </div>
                    </div>`+ '\n'
                }
            }
        }
        console.log(text, "TTTTTTTTTTTTTTTT");
        document.getElementById("subs").innerHTML = text;
    }
}

// function setsBrand() {
//     // localStorage.removeItem('propage')
//     var text = "";
//     var data = JSON.parse(localStorage.getItem('Brand'));
//     console.log(data,"DDDDDDDDDDDDDDDD");
//     if (data.length != 0) {
//         var n = ( data.length < 4 ) ? data.length : 4
//         for (var i = 0; i < n; i++) {
//             text = text + `<div class="values flex_row space_between center" id="brand_table_stagger">
//             <div class="image flex_row center">
//                 <img src="data:image/png;base64, ${data[i].image}" alt="">
//             </div>
//             <p onclick="showDetails(event, 'third_category')">${data[i].name}</p>
            
//             <div class="action flex_row space_between center">
//                 <button value=${i} onclick="{showDetails(event, 'add_brand', this);setData(event, 'add_brand', this);}"><img src="../images/edit_yellow.png" alt=""></button>
//                 <button value=${i} onclick="deleteBrand(event, 'add_brand', this)"><img src="../images/delete_outline_black_24dp 1.png" alt=""></button>
//             </div>
//             </div>`+ '\n'
//             }
//             console.log(text, "TTTTTTTTTTTTTTTT");
//             document.getElementById("dat").innerHTML = text;
//             clearInterval(myInterval1);
//     }
// }

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
    console.log(element.querySelector('h1').innerHTML, "IIIIIIIIIIIIIIIIIIIII");

    // Please remove if needed added for validation errors
    document.querySelectorAll('.details.popup input').forEach(input => {
        if (!input.value) document.querySelector('#error_text').innerHTML = 'Please Enter All The Fields';
        document.querySelector('#error_text').style.left = '50%';
        document.querySelector('#error_text').style.top = '10rem';
        document.querySelector('#error_text').style.transform = 'translateX(-50%)';
        // document.querySelector('#error_text').style.margin = '0 auto';
        document.querySelector('#error_text').style.display = 'block';
        input.style.border = '2px solid red'
    });
    
    setTimeout(() => {
        document.querySelectorAll('.details.popup input').forEach(input => {
            input.style.border = 'none'
            document.querySelector('#error_text').style.display = 'none';
        });
    }, 1000)

    return;
    
    if(element.querySelector('h1').innerHTML=='Add Main Category')
    {
        AddProduct();
    }
    else if(element.querySelector('h1').innerHTML=='Edit Main Category')
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
    else if(element.querySelector('h1').innerHTML=='Add Subcategory')
    {
        AddSubcategory();
    }
    else if(element.querySelector('h1').innerHTML=='Edit Subcategory')
    {
        var ind = parseInt(document.getElementById('subcatind').innerText)
        var inds = parseInt(document.getElementById('catind').innerText)
        var profile = JSON.parse(localStorage.getItem('Login'));
        var data1 = catwithdata
        var data = data1.data[inds].subcategory[ind];
        var id = data1.data[inds].subcategory[ind]._id
        var sets = {}
        data.name == document.getElementById('cate').value ? null : sets.name = document.getElementById('cate').value
                
        console.log(Object.keys(sets).length === 0 && sets.constructor === Object, ind, inds, id, data, sets)
        if(!(Object.keys(sets).length === 0 && sets.constructor === Object))
        {
        var bod = {
            "id": id,
            "new": sets
        }
        try {
            const response = await fetch(BASE_URL + 'products/updatesubcategory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer '+profile.token
            },
            body: JSON.stringify(bod)
            });
            const result = await response.json();
            // localStorage.setItem('Category','');
            console.log("Response:", result);
            window.location.reload();
        } catch (error) {
            console.error("Error:", error);
        }
        }
    }
    else if(element.querySelector('h1').innerHTML=='Add Second Subcategory')
    {
        AddSecSubcategory();
    }
    else if(element.querySelector('h1').innerHTML=='Edit Second Subcategory')
    {
        var ind = parseInt(document.getElementById('subscatind').innerText)
        // var inds = parseInt(document.getElementById('catind').innerText)
        var profile = JSON.parse(localStorage.getItem('Login'));
        // var data1 = catwithdata
        var data = SubCategoryWithData.subcategorys[ind];
        // var id = data1.data[inds].subcategory[ind]._id
        var sets = {}

        data.name == document.getElementById('cate').value ? null : sets.name = document.getElementById('cate').value
        data.image == document.getElementById('cateimg').value ? null : sets.image = document.getElementById('cateimg').value

        console.log(Object.keys(sets).length === 0 && sets.constructor === Object, ind, data, sets)
        if(!(Object.keys(sets).length === 0 && sets.constructor === Object))
        {
        var bod = {
            "id": id,
            "new": sets
        }
        try {
            const response = await fetch(BASE_URL + 'products/updatesubcategory1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer '+profile.token
            },
            body: JSON.stringify(bod)
            });
            const result = await response.json();
            // localStorage.setItem('Category','');
            console.log("Response:", result);
            window.location.reload();
        } catch (error) {
            console.error("Error:", error);
        }
        }
    }
    else if(element.querySelector('h1').innerHTML=='Add Brand')
    {
        AddBrand();
    }
    else if(element.querySelector('h1').innerHTML=='Edit Brand')
    {
        EditBrand();
    }
}

async function EditPacks() {
    const element = document.querySelector('.edit_category.edit_pack.flex_column');
    console.log(element.querySelector('h1').innerHTML, "IIIIIIIIIIIIIIIIIIIII");
    if(element.querySelector('h1').innerHTML=='Add Pack')
    {
        AddPacks();
    }
    else
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

async function AddPacks(event, val, i) {
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

async function AddSubcategory(event, val, i) {
    // var imgs = localStorage.getItem('CategoryImage')
    let datas = {
        name: document.getElementById('cate').value,
        categoryId: document.getElementById('catid').innerText
    }
    console.log(datas)
    var profile = JSON.parse(localStorage.getItem('Login'));
    try {
        const response = await fetch(BASE_URL + 'products/subcategory', {
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

async function AddSecSubcategory(event, val, i) {
    // var imgs = localStorage.getItem('CategoryImage')
    let datas = {
        name: document.getElementById('cate').value,
        categoryId: document.getElementById('catid').innerText,
        image: 'image',
        subCategoryId: document.getElementById('subcatid').innerText,
    }
    console.log(datas)
    var profile = JSON.parse(localStorage.getItem('Login'));
    try {
        const response = await fetch(BASE_URL + 'products/subcategory1', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer '+profile.token
          },
          body: JSON.stringify(datas)
        });
        const result = await response.json();
        // localStorage.setItem('Category','');
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
    var data = brand;
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
        // localStorage.setItem('Brand','');
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
    var arr = val.value.split(',')
    console.log(event, val, arr, arr[0], arr[1], "DDDDDDDDDD");
    document.getElementById('subcatind').innerHTML = arr[1]
    document.getElementById('subcatid').innerHTML = arr[2]
    // var ind = parseInt(val.value);
    // localStorage.setItem('brandind', ind);
    // var data = JSON.parse(localStorage.getItem('CategoryWithData'));
    // var data = catwithdata
    // document.getElementById('bradname').value = data.data[val.value[0]].subcategory[val.value[1]].name
}

async function setSubDatass(event, title, val) {
    var inds = val.getAttribute('value').split(',');
    // console.log(event, val, inds[0], inds[1], "DDDDDDDDDD");
    // var ind = parseInt(val.value);
    // localStorage.setItem('brandind', ind);
    // var data = JSON.parse(localStorage.getItem('CategoryWithData'));
    var data = catwithdata
    console.log(data.data[parseInt(inds[0])].subcategory, data.data[parseInt(inds[0])].subcategory[parseInt(inds[1])].name, "HHHHHHH")
    SubCatWithData(data.data[parseInt(inds[0])].subcategory[parseInt(inds[1])]._id)
}

async function setProData(val) {
    console.log(val);
    var inds = val.getAttribute('value');
    console.log(inds, val, "DDDDDDDDDD");
    ProWithData(inds)
}

async function setProDatas(val, vals) {
    console.log(val, vals.value);
    document.getElementById('subscatind').innerHTML = val;
    document.getElementById('subscatid').innerHTML = vals.value;
    var inds = val.getAttribute('value');
    // console.log(inds, val, "DDDDDDDDDD");
}

async function change() {
    // Langs = await English().then((res)=> {
    //     return res
    // })

    var lang = await localStorage.getItem('lang')

    if(lang)
    {
        if(lang == 'english')
        {
            Langs = await English().then((res)=> {
                return res
            })
        }
        else
        {
            Langs = await Spanish().then((res)=> {
                return res
            })
        }
    }
    else
    {
        if(await LANG == 'english')
        {
            Langs = await English().then((res)=> {
                return res
            })
        }
        else
        {
            Langs = await Spanish().then((res)=> {
                return res
            })
        }
    }

    document.getElementById('sides').innerHTML = `<div class="sidebar flex_column">
    <img src="../images/logo.png">
    <ul>
        <li class="flex_column justify_center">
            <a href="../Dashboard/dashboard.html" class="flex_row center">
                <img src="../images/dashboard.png" alt="dashboard">
                <p>${Langs.dashboard}</p>
            </a>
        </li>
        <li class="flex_column justify_center">
            <a href="../User Management/user.html" class="flex_row center">
                <img src="../images/management.png" alt="dashboard">
                <p>${Langs.user_management}</p>
            </a>
        </li>
        <li class="active flex_column justify_center">
            <a href="../Product Management/product.html" class="flex_row center">
                <img src="../images/product_management.png" alt="dashboard">
                <p>${Langs.prod_manage}</p>
            </a>
        </li>
        <li class="flex_column justify_center">
            <a href="../Orders/orders.html" class="flex_row center">
                <img src="../images/purchase_order.png" alt="dashboard">
                <p>${Langs.orders}</p>
            </a>
        </li>
        <li class="flex_column justify_center">
            <a href="../Wheel And Games/wheel_games.html" class="flex_row center">
                <img src="../images/wheel.png" alt="dashboard">
                <p>${Langs.raffel}</p>
            </a>
        </li>
        <li class="flex_column justify_center">
            <a href="../Marketing/marketing.html" class="flex_row center">
                <img src="../images/marketing.png" alt="dashboard">
                <p>${Langs.man_mar}</p>
            </a>
        </li>
        <li class="flex_column justify_center">
            <a href="../Payment/payment.html" class="flex_row center">
                <img src="../images/payment_black_24dp 1.png" alt="dashboard">
                <p>${Langs.man_pay}</p>
            </a>
        </li>
        <li class="flex_column justify_center">
            <a href="../CMS/content.html" class="flex_row center">
                <img src="../images/content.png" alt="dashboard">
                <p>CMS</p>
            </a>
        </li>
        <li class="flex_column justify_center">
            <a href="../Report/report.html" class="flex_row center">
                <img src="../images/graph_report.png" alt="dashboard">
                <p>${Langs.report}</p>
            </a>
        </li>
        <li class="flex_column justify_center">
            <a href="../Support/support.html" class="flex_row center">
                <img src="../images/headphone.png" alt="dashboard">
                <p>${Langs.sup_man}</p>
            </a>
        </li>
    </ul>
    <div class="bottom_buttons flex_row space_between center width_full">
            <!-- <div class="image" onclick="showNotifications(event)">
                <img src="../images/notification.png" alt="">
                <span></span>
            </div> -->
            <div class="image">
                <img src="../images/terms_conditions.png" alt="">
            </div>
            <div class="image" onclick="showLanguage(event)">
                <img src="../images/globe.png" alt="">
            </div>
            <div class="image" onclick="window.location.href = '../Login/login.html'">
                <img src="../images/logout.png" alt="">
            </div>
    </div>
    </div>`

    document.getElementById('pro_m').textContent = Langs.logged

    document.getElementById('pro_h').innerHTML = `<p>${Langs.image}</p>
    <div class="flex_row center justify_center">
        <p>${Langs.cate}</p>
        <button><img src="../images/sort.png" alt=""></button>
    </div>
    <p># ${Langs.of_pro}</p>
    <p>${Langs.stock}</p>
    <p>SKU</p>
    <p>${Langs.action}</p>`

    document.getElementById('appo').innerHTML = `<h1 id="products_tab" onclick="showDetails(event, 'products')" class="active">${Langs.prod_cat}</h1>
    <h1 id="brands_tab" onclick="showDetails(event, 'brands')">${Langs.brand}</h1>
    <h1 id="packs_tab" onclick="showDetails(event, 'packs')">${Langs.pack}</h1>
    <h1 id="virals_tab" onclick="showDetails(event, 'virals')">${Langs.viral}</h1>`

    document.getElementById('addnew').innerHTML = `<button onclick="showDetails(event, 'add_category')" id="category">${Langs.add_cat}</button>
    <button onclick="showDetails(event, 'add_brand')" id="brands" style="display: none;">${Langs.add_brand}</button>
    <button onclick="showDetails(event, 'add_pack')" id="packs" style="display: none;">${Langs.add_pack}</button>
    <button onclick="showDetails(event, 'product_details')" id="virals" style="display: none;">${Langs.add_viral}</button>`

    console.log(Langs, "LLLLLLLLLLLLLLLL")
}