/**
 * GOOGLE APPS SCRIPT - CIRCUITO TURÍSTICO PIURA-CATACAOS
 *
 * INSTRUCCIONES DE CONFIGURACIÓN:
 *
 * 1. Ve a https://script.google.com/
 * 2. Crea un nuevo proyecto
 * 3. Copia y pega TODO este código
 * 4. Guarda el proyecto (Ctrl+S)
 * 5. Ejecuta la función 'setup()' una vez para crear las hojas
 * 6. Despliega como Web App:
 *    - Hacer clic en "Implementar" > "Nueva implementación"
 *    - Seleccionar tipo: "Aplicación web"
 *    - Ejecutar como: "Yo"
 *    - Quién tiene acceso: "Cualquiera"
 *    - Hacer clic en "Implementar"
 * 7. Copia la URL generada y pégala en analytics.js (GOOGLE_SCRIPT_URL)
 */

// ID de tu Google Sheet (se obtiene de la URL del spreadsheet)
// Ejemplo: https://docs.google.com/spreadsheets/d/TU_SPREADSHEET_ID/edit
const SPREADSHEET_ID = ''; // Dejar vacío para crear uno nuevo automáticamente

// ============================================
// FUNCIÓN DE CONFIGURACIÓN INICIAL
// ============================================

function setup() {
  let ss;

  if (SPREADSHEET_ID) {
    ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  } else {
    // Crear nuevo spreadsheet
    ss = SpreadsheetApp.create('Circuito Turístico - Analytics Dashboard');
    Logger.log('📊 Spreadsheet creado: ' + ss.getUrl());
    Logger.log('📝 Guarda este ID: ' + ss.getId());
  }

  // Crear hojas de datos
  createSheets(ss);

  // Crear dashboard
  createDashboard(ss);

  Logger.log('✅ Configuración completada');
  Logger.log('🔗 URL del Spreadsheet: ' + ss.getUrl());
}

function createSheets(ss) {
  const sheets = [
    {
      name: 'Eventos',
      headers: ['Timestamp', 'Tipo', 'Session ID', 'User ID', 'Categoria', 'Accion', 'Label', 'Valor', 'Dispositivo', 'Navegador', 'Seccion']
    },
    {
      name: 'Vistas de Página',
      headers: ['Timestamp', 'Session ID', 'User ID', 'Seccion', 'URL', 'Dispositivo', 'Navegador', 'Ancho Pantalla', 'Idioma', 'Referrer', 'UTM Source', 'UTM Medium', 'UTM Campaign']
    },
    {
      name: 'Búsquedas',
      headers: ['Timestamp', 'Session ID', 'User ID', 'Consulta', 'Filtros', 'Dispositivo', 'Navegador']
    },
    {
      name: 'Productos Vistos',
      headers: ['Timestamp', 'Session ID', 'User ID', 'ID Producto', 'Nombre Producto', 'Categoria', 'Precio', 'Dispositivo']
    },
    {
      name: 'Carrito',
      headers: ['Timestamp', 'Session ID', 'User ID', 'ID Producto', 'Nombre Producto', 'Precio', 'Cantidad', 'Fecha Reserva', 'Total', 'Dispositivo']
    },
    {
      name: 'Checkout',
      headers: ['Timestamp', 'Session ID', 'User ID', 'Items', 'Total', 'Cantidad Items', 'Dispositivo']
    },
    {
      name: 'Formularios',
      headers: ['Timestamp', 'Session ID', 'User ID', 'Nombre Formulario', 'Datos', 'Dispositivo']
    },
    {
      name: 'Chatbot',
      headers: ['Timestamp', 'Session ID', 'User ID', 'Mensaje Usuario', 'Respuesta Bot', 'Intención', 'Dispositivo']
    },
    {
      name: 'Clics',
      headers: ['Timestamp', 'Session ID', 'User ID', 'Tipo Elemento', 'ID Elemento', 'Texto', 'Seccion Actual', 'Dispositivo']
    },
    {
      name: 'Scroll',
      headers: ['Timestamp', 'Session ID', 'User ID', 'Porcentaje Scroll', 'Dispositivo']
    },
    {
      name: 'Sesiones',
      headers: ['Timestamp', 'Session ID', 'User ID', 'Tiempo en Página (seg)', 'Secciones Vistas', 'Dispositivo', 'Navegador']
    },
    {
      name: 'Wishlist',
      headers: ['Timestamp', 'Session ID', 'User ID', 'Accion', 'ID Producto', 'Nombre Producto', 'Dispositivo']
    },
    {
      name: 'Filtros',
      headers: ['Timestamp', 'Session ID', 'User ID', 'Tipo Filtro', 'Valor Filtro', 'Dispositivo']
    },
    {
      name: 'Restaurantes',
      headers: ['Timestamp', 'Session ID', 'User ID', 'Nombre Restaurante', 'Dispositivo']
    },
    {
      name: 'Mapa',
      headers: ['Timestamp', 'Session ID', 'User ID', 'Accion', 'Ubicacion', 'Coordenadas', 'Dispositivo']
    },
    {
      name: 'Usuarios Únicos',
      headers: ['User ID', 'Primera Visita', 'Última Visita', 'Total Sesiones', 'Total Eventos', 'Dispositivo Principal']
    }
  ];

  sheets.forEach(sheetConfig => {
    let sheet = ss.getSheetByName(sheetConfig.name);

    if (!sheet) {
      sheet = ss.insertSheet(sheetConfig.name);
    }

    // Agregar headers
    const headerRange = sheet.getRange(1, 1, 1, sheetConfig.headers.length);
    headerRange.setValues([sheetConfig.headers]);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#D4A574');
    headerRange.setFontColor('#FFFFFF');

    // Congelar primera fila
    sheet.setFrozenRows(1);
  });

  // Eliminar hoja por defecto si existe
  const defaultSheet = ss.getSheetByName('Hoja 1') || ss.getSheetByName('Sheet1');
  if (defaultSheet && ss.getSheets().length > 1) {
    ss.deleteSheet(defaultSheet);
  }
}

function createDashboard(ss) {
  let dashboard = ss.getSheetByName('📊 Dashboard');

  if (!dashboard) {
    dashboard = ss.insertSheet('📊 Dashboard', 0);
  }

  // Limpiar dashboard
  dashboard.clear();

  // Título
  dashboard.getRange('A1').setValue('DASHBOARD DE ANALYTICS - CIRCUITO TURÍSTICO');
  dashboard.getRange('A1:H1').merge();
  dashboard.getRange('A1').setFontSize(18).setFontWeight('bold').setBackground('#2C3E50').setFontColor('#FFFFFF');

  // KPIs principales
  const kpis = [
    ['B3', 'Total Usuarios', '=COUNTA(UNIQUE(\'Usuarios Únicos\'!A:A))-1'],
    ['D3', 'Total Sesiones', '=COUNTA(UNIQUE(Sesiones!B:B))-1'],
    ['F3', 'Productos Vistos', '=COUNTA(\'Productos Vistos\'!A:A)-1'],
    ['H3', 'Items en Carrito', '=COUNTA(Carrito!A:A)-1'],
    ['B6', 'Formularios', '=COUNTA(Formularios!A:A)-1'],
    ['D6', 'Interacciones Chatbot', '=COUNTA(Chatbot!A:A)-1'],
    ['F6', 'Búsquedas', '=COUNTA(Búsquedas!A:A)-1'],
    ['H6', 'Total Checkout', '=COUNTA(Checkout!A:A)-1']
  ];

  kpis.forEach(kpi => {
    dashboard.getRange(kpi[0]).setValue(kpi[1]).setFontWeight('bold').setBackground('#E8E8E8');
    const valueCell = kpi[0].replace(/\d+/, (match) => parseInt(match) + 1);
    dashboard.getRange(valueCell).setFormula(kpi[2]).setFontSize(24).setFontWeight('bold').setFontColor('#D4A574');
  });

  // Secciones de métricas
  dashboard.getRange('A9').setValue('MÉTRICAS POR SECCIÓN');
  dashboard.getRange('A9:D9').merge();
  dashboard.getRange('A9').setFontSize(14).setFontWeight('bold').setBackground('#34495E').setFontColor('#FFFFFF');

  // Headers de métricas
  dashboard.getRange('A10:D10').setValues([['Sección', 'Vistas', 'Clics', '% del Total']]);
  dashboard.getRange('A10:D10').setFontWeight('bold').setBackground('#BDC3C7');

  // Fórmulas para métricas por sección
  const secciones = ['inicio', 'destinos', 'experiencias', 'talleres', 'gastronomia', 'paquetes', 'mapa', 'contacto'];
  secciones.forEach((seccion, index) => {
    const row = 11 + index;
    dashboard.getRange(`A${row}`).setValue(seccion.charAt(0).toUpperCase() + seccion.slice(1));
    dashboard.getRange(`B${row}`).setFormula(`=COUNTIF('Vistas de Página'!D:D,"${seccion}")`);
    dashboard.getRange(`C${row}`).setFormula(`=COUNTIF(Clics!G:G,"${seccion}")`);
    dashboard.getRange(`D${row}`).setFormula(`=IFERROR(B${row}/SUM(B11:B18)*100,0)&"%"`);
  });

  // Dispositivos
  dashboard.getRange('F9').setValue('DISPOSITIVOS');
  dashboard.getRange('F9:H9').merge();
  dashboard.getRange('F9').setFontSize(14).setFontWeight('bold').setBackground('#34495E').setFontColor('#FFFFFF');

  dashboard.getRange('F10:H10').setValues([['Dispositivo', 'Sesiones', '%']]);
  dashboard.getRange('F10:H10').setFontWeight('bold').setBackground('#BDC3C7');

  const dispositivos = ['Desktop', 'Mobile', 'Tablet'];
  dispositivos.forEach((dispositivo, index) => {
    const row = 11 + index;
    dashboard.getRange(`F${row}`).setValue(dispositivo);
    dashboard.getRange(`G${row}`).setFormula(`=COUNTIF('Vistas de Página'!F:F,"${dispositivo}")`);
    dashboard.getRange(`H${row}`).setFormula(`=IFERROR(G${row}/SUM(G11:G13)*100,0)&"%"`);
  });

  // Productos más vistos
  dashboard.getRange('A20').setValue('TOP 5 EXPERIENCIAS MÁS VISTAS');
  dashboard.getRange('A20:D20').merge();
  dashboard.getRange('A20').setFontSize(14).setFontWeight('bold').setBackground('#34495E').setFontColor('#FFFFFF');

  // Últimas conversiones
  dashboard.getRange('F20').setValue('ÚLTIMAS ACCIONES DE CARRITO');
  dashboard.getRange('F20:I20').merge();
  dashboard.getRange('F20').setFontSize(14).setFontWeight('bold').setBackground('#34495E').setFontColor('#FFFFFF');

  // Ajustar anchos de columna
  dashboard.setColumnWidth(1, 150);
  dashboard.setColumnWidth(2, 100);
  dashboard.setColumnWidth(3, 100);
  dashboard.setColumnWidth(4, 100);
  dashboard.setColumnWidth(5, 30);
  dashboard.setColumnWidth(6, 120);
  dashboard.setColumnWidth(7, 100);
  dashboard.setColumnWidth(8, 80);
}

// ============================================
// FUNCIÓN PRINCIPAL - RECIBE DATOS DEL PROTOTIPO
// ============================================

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    processData(data);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'ok',
      message: 'Analytics API activa',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

function processData(data) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID || PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID'));

  switch(data.type) {
    case 'PAGE_VIEW':
      appendToSheet(ss, 'Vistas de Página', [
        data.timestamp,
        data.sessionId,
        data.userId,
        data.section,
        data.url,
        data.device,
        data.browser,
        data.screenWidth,
        data.language,
        data.referrer,
        data.utm_source,
        data.utm_medium,
        data.utm_campaign
      ]);
      break;

    case 'EVENT':
      appendToSheet(ss, 'Eventos', [
        data.timestamp,
        data.type,
        data.sessionId,
        data.userId,
        data.category,
        data.action,
        data.label,
        data.value,
        data.device,
        data.browser,
        data.currentSection || ''
      ]);
      break;

    case 'SEARCH':
      appendToSheet(ss, 'Búsquedas', [
        data.timestamp,
        data.sessionId,
        data.userId,
        data.searchQuery,
        data.filters,
        data.device,
        data.browser
      ]);
      break;

    case 'PRODUCT_VIEW':
      appendToSheet(ss, 'Productos Vistos', [
        data.timestamp,
        data.sessionId,
        data.userId,
        data.productId,
        data.productName,
        data.category,
        data.price,
        data.device
      ]);
      break;

    case 'ADD_TO_CART':
      appendToSheet(ss, 'Carrito', [
        data.timestamp,
        data.sessionId,
        data.userId,
        data.productId,
        data.productName,
        data.price,
        data.quantity,
        data.reservationDate,
        data.totalValue,
        data.device
      ]);
      break;

    case 'CHECKOUT_START':
      appendToSheet(ss, 'Checkout', [
        data.timestamp,
        data.sessionId,
        data.userId,
        data.cartItems,
        data.totalValue,
        data.itemCount,
        data.device
      ]);
      break;

    case 'FORM_SUBMIT':
      appendToSheet(ss, 'Formularios', [
        data.timestamp,
        data.sessionId,
        data.userId,
        data.formName,
        data.formData,
        data.device
      ]);
      break;

    case 'CHATBOT':
      appendToSheet(ss, 'Chatbot', [
        data.timestamp,
        data.sessionId,
        data.userId,
        data.userMessage,
        data.botResponse,
        data.intent,
        data.device
      ]);
      break;

    case 'CLICK':
      appendToSheet(ss, 'Clics', [
        data.timestamp,
        data.sessionId,
        data.userId,
        data.elementType,
        data.elementId,
        data.elementText,
        data.currentSection,
        data.device
      ]);
      break;

    case 'SCROLL':
      appendToSheet(ss, 'Scroll', [
        data.timestamp,
        data.sessionId,
        data.userId,
        data.scrollPercentage,
        data.device
      ]);
      break;

    case 'SESSION_END':
      appendToSheet(ss, 'Sesiones', [
        data.timestamp,
        data.sessionId,
        data.userId,
        data.timeOnPageSeconds,
        data.sectionsViewed,
        data.device,
        data.browser
      ]);
      updateUserRecord(ss, data);
      break;

    case 'WISHLIST':
      appendToSheet(ss, 'Wishlist', [
        data.timestamp,
        data.sessionId,
        data.userId,
        data.action,
        data.productId,
        data.productName,
        data.device
      ]);
      break;

    case 'FILTER':
      appendToSheet(ss, 'Filtros', [
        data.timestamp,
        data.sessionId,
        data.userId,
        data.filterType,
        data.filterValue,
        data.device
      ]);
      break;

    case 'RESTAURANT_RESERVATION':
      appendToSheet(ss, 'Restaurantes', [
        data.timestamp,
        data.sessionId,
        data.userId,
        data.restaurantName,
        data.device
      ]);
      break;

    case 'MAP_INTERACTION':
      appendToSheet(ss, 'Mapa', [
        data.timestamp,
        data.sessionId,
        data.userId,
        data.action,
        data.locationName,
        data.coordinates,
        data.device
      ]);
      break;
  }
}

function appendToSheet(ss, sheetName, rowData) {
  const sheet = ss.getSheetByName(sheetName);
  if (sheet) {
    sheet.appendRow(rowData);
  }
}

function updateUserRecord(ss, data) {
  const sheet = ss.getSheetByName('Usuarios Únicos');
  if (!sheet) return;

  const userId = data.userId;
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();

  let userRow = -1;
  for (let i = 1; i < values.length; i++) {
    if (values[i][0] === userId) {
      userRow = i + 1;
      break;
    }
  }

  if (userRow === -1) {
    // Nuevo usuario
    sheet.appendRow([
      userId,
      data.timestamp, // Primera visita
      data.timestamp, // Última visita
      1, // Total sesiones
      1, // Total eventos
      data.device // Dispositivo principal
    ]);
  } else {
    // Actualizar usuario existente
    sheet.getRange(userRow, 3).setValue(data.timestamp); // Última visita
    const currentSessions = sheet.getRange(userRow, 4).getValue();
    sheet.getRange(userRow, 4).setValue(currentSessions + 1); // Total sesiones
    const currentEvents = sheet.getRange(userRow, 5).getValue();
    sheet.getRange(userRow, 5).setValue(currentEvents + 1); // Total eventos
  }
}

// ============================================
// FUNCIONES ÚTILES PARA ANÁLISIS
// ============================================

function getAnalyticsSummary() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID || PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID'));

  const summary = {
    totalUsers: ss.getSheetByName('Usuarios Únicos').getLastRow() - 1,
    totalSessions: ss.getSheetByName('Sesiones').getLastRow() - 1,
    totalPageViews: ss.getSheetByName('Vistas de Página').getLastRow() - 1,
    totalProductViews: ss.getSheetByName('Productos Vistos').getLastRow() - 1,
    totalAddToCart: ss.getSheetByName('Carrito').getLastRow() - 1,
    totalCheckouts: ss.getSheetByName('Checkout').getLastRow() - 1,
    totalFormSubmissions: ss.getSheetByName('Formularios').getLastRow() - 1,
    totalChatbotInteractions: ss.getSheetByName('Chatbot').getLastRow() - 1
  };

  Logger.log(JSON.stringify(summary, null, 2));
  return summary;
}

function clearAllData() {
  // ⚠️ CUIDADO: Esta función borra todos los datos
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID || PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID'));

  const sheets = ss.getSheets();
  sheets.forEach(sheet => {
    const name = sheet.getName();
    if (name !== '📊 Dashboard') {
      const lastRow = sheet.getLastRow();
      if (lastRow > 1) {
        sheet.deleteRows(2, lastRow - 1);
      }
    }
  });

  Logger.log('✅ Todos los datos han sido eliminados');
}
