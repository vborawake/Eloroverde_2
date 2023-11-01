const BASE_URL = 'https://eloroverde-pjc5.onrender.com/'
const USER = 'user/'
var LANG = 'english'

const Datas = {
  welcome: 'Welcome Back',
  here: 'Here is what happening with your store today !',
  total: 'Total Sales',
  visitors: 'Visitors',
  orders: 'Orders',
  unit: 'Units Sold',
  revenue: 'Revenue VS Order',
  sales: 'Sales by Category',
  conversions: 'Conversions (Cart -to-Buy)',
  raffel: 'Raffel Winners',
  recent: 'Recent Orders',
  name: 'Name',
  address: 'Address',
  quantity: 'Quantity',
  order_amount: 'Order Amount',
  status: 'Status',
  action: 'Action',
  seeall: 'See All',
  user_management: 'User Management',
  logged: 'List Of All Logged Users',
  loc: 'Location',
  email: 'Email',
  logedin: 'Logged In At',
  prod_manage: 'Product Management',
  prod_cat: 'Product Category',
  brand: 'Brands',
  pack: 'Packs',
  viral: 'Virals',
  image: 'Image',
  pro_name: 'Product Name',
  cate: 'Category',
  of_pro: 'of Product',
  stock: 'Stock',
  add_cat: 'Add New Category',
  brand_nam: 'Brand name',
  position: 'Position',
  add_brand: 'Add New Brand',
  add_pack: 'Add New Packs',
  add_viral: 'Add New Viral',
  add_coupon: 'Add Coupon Code',
  add_customer: 'Add Customer',
  detail: 'Detail',
  price: 'Price',
  list_of: 'List of',
  add_sub: 'Add New Subcategory',
  add_prod: 'Add New Products',
  cust_name: 'Customer Name',
  order_id: 'Order ID',
  date: 'Date',
  prize: 'Prize Won',
  coupon_code: 'Coupon Code',
  exp: 'Expiry',
  add_prize: 'Add Raffle Wheel Prizes',
  raffle_wheel: 'Raffle wheel and Games',
  list_raffle: 'List of Raffle wheel winners',
  man_mar: 'Manage Marketing',
  send_mail: 'Send an email to your subscribers',
  manage: 'Manage',
  send_inv: 'Send Invitation',
  stat_inv: 'Status of Invitation',
  coup_pro: 'Coupon Code for Promo',
  usage_limit: 'Usage Limit',
  usg_tot: 'Usage Total',
  bud_allo: 'Budget allocated',
  bud_used: 'Budget Used',
  balanced: 'Balaced',
  man_pay: 'Manage Payment',
  list_ord: 'List Of All Orders Received',
  userna: 'Username',
  amount: 'Amount',
  tot_rev: 'Total Revenue',
  earbbycat: 'Earning by Category',
  sup_man: 'Support Management',
  req_id: 'Request ID',
  dashboard: 'Dashboard',
  report: 'Report',
  raffel: 'Raffel Wheel and Games',
  disc: 'Discount',
  mess: 'Message', 
  close: 'Close',
  delete: 'Delete',
  block: 'Block',
  cont: 'Contact',
  prev_ord: 'Previously Ordered',
  logtim: 'Logged In Time'
}

const DataSpanish = {
  welcome: 'Bienvenido de nuevo',
  here: '¡Esto es lo que sucede con tu tienda hoy!',
  total: 'Ventas totales',
  visitors: 'Visitantes',
  orders: 'Pedidos',
  unit: 'Unidades vendidas',
  revenue: 'Ingresos versus pedido',
  sales: 'Ventas por categoría',
  conversions: 'Conversiones (carrito para comprar)',
  raffel: 'Ganadoras / Ganadores de la rifa',
  recent: 'órdenes recientes',
  name: 'Nombre',
  address: 'DIRECCIÓN',
  qauantity: 'Cantidad',
  order_amount: 'Total de la orden',
  status: 'Estado',
  action: 'Acción',
  see_all: 'Ver todo',
  user_management: 'Gestión de usuarios',
  logged: 'Lista de todos los usuarios registrados',
  loc: 'Ubicación',
  email: 'Correo electrónico',
  logedin: 'Iniciado sesión en',
  prod_manage: 'Gestión de productos',
  prod_cat: 'categoria de producto',
  brand: 'Marcas',
  pack: 'Paquetes',
  viral: 'virales',
  image: 'Imagen',
  pro_name: 'nombre del producto',
  cate: 'Categoría',
  of_pro: 'del producto',
  stock: 'Existencias',
  add_cat: 'Añadir nueva categoria',
  brand_nam: 'Nombre de la marca',
  position: 'Posición',
  add_brand: 'Agregar nueva marca',
  add_pack: 'Agregar nuevos paquetes',
  add_viral: 'Agregar nuevo viral',
  add_coupon: 'Agregar código de cupón',
  add_customer: 'Agregar cliente',
  detail: 'Detalle',
  price: 'Precio',
  list_of: 'Lista de',
  add_sub: 'Agregar nueva subcategoría',
  add_prod: 'Agregar nuevos productos',
  cust_name: 'Nombre del cliente',
  order_id: 'Solicitar ID',
  date: 'fecha',
  prize: 'Premio ganado',
  coupon_code: 'Código promocional',
  exp: 'Expiración',
  add_prize: 'Agregar premios a la rueda de la rifa',
  raffle_wheel: 'Rueda de rifa y juegos',
  list_raffle: 'Lista de ganadores de la rueda de la rifa',
  man_mar: 'Gestionar marketing',
  send_mail: 'Envía un correo electrónico a tus suscriptores',
  manage: 'Administrar',
  send_inv: 'Enviar invitacion',
  stat_inv: 'Estado de la invitación',
  coup_pro: 'Código de cupón para promoción',
  usage_limit: 'Límite de uso',
  usg_tot: 'Uso total',
  bud_allo: 'Presupuesto asignado',
  bud_used: 'Presupuesto utilizado',
  balanced: 'Equilibrado',
  man_pay: 'Administrar pago',
  list_ord: 'Lista de todos los pedidos recibidos',
  userna: 'Nombre de usuario',
  amount: 'Cantidad',
  tot_rev: 'Los ingresos totales',
  earbbycat: 'Ganancias por categoría',
  sup_man: 'Gestión de soporte',
  req_id: 'Solicitar identificación',
  dashboard: 'Panel',
  report: 'Informe',
  raffel: 'Rueda de rifa y juegos',
  disc: 'Descuento',
  mess: 'Mensaje',
  close: 'Cerca',
  delete: 'Borrar',
  block: 'Bloquear',
  cont: 'Contacto',
  prev_ord: 'Ordenado previamente',
  logtim: 'Tiempo de sesión iniciada'
}

async function Posts(data) {
  console.log(data, "DDDDDDDDDDDDDDDDDDDDDD")
  var datas = {}
  for (var key in data) {
    if (key != 'method' && key != 'urls' && key != 'headerss' && key != 'actions') {
      datas[key] = data[key];
    }
  }
  try {
    const response = await fetch(BASE_URL + data.urls, {
      method: data.method,
      headers: data.headerss,
      body: data.method == "POST" ? JSON.stringify(datas) : null
    });
    const result = await response.json();
    if (result.success == true) {
      localStorage.setItem(data.saving, JSON.stringify(result));
      // data.actions;
    }
    console.log("Response:", result);
    return result
  } catch (error) {
    console.error("Error:", error);
    return error
  }
}

async function Gets(data) {
  console.log(data, "DDDDDDDDDDDDDDDDDDDDDD")
  var datas = {}
  for (var key in data) {
    if (key != 'method' && key != 'urls' && key != 'headerss' && key != 'actions') {
      datas[key] = data[key];
    }
  }
  try {
    const response = await fetch(BASE_URL + data.urls, {
      method: data.method,
      headers: data.headerss,
      body: data.method == "POST" ? JSON.stringify(datas) : null
    });
    const result = await response.json();
    data.saving ? localStorage.setItem(data.saving, JSON.stringify(result)) : null
    console.log("Response:", result);
    return result
  } catch (error) {
    console.error("Error:", error);
    return error
  }
}

async function English() {
  return Datas
}

async function Spanish() {
  return DataSpanish
}

async function ChangeAll(val) {
  await localStorage.setItem('lang', val);
  console.log(val, "VVVVVVVVVVVVVVVVV")
  LANG = val
}