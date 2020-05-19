console.log('Is this working?');

let viz;

const url = 
    "https://public.tableau.com/views/SuperStoreMobile/Setactionstochangebreakdown";

const vizContainer = document.getElementById('vizContainer');
const options = {
    device: "desktop",
    "Year of Order Date": "",
    hideTabs: true,
    hideToolbar: true,
    onFirstInteraction: function() {
        workbook = viz.getWorkbook();
        activeSheet = workbook.getActiveSheet();
        console.log("My dashboard is interactive");
    }
};

//create a function to generate the viz element 
function initViz() {
    console.log('Executing the initViz function!');
    viz = new tableau.Viz(vizContainer, url, options);
}

// run the initViz function when the page loads
document.addEventListener("DOMContentLoaded", initViz);

const exportPDF = document.getElementById('exportPDF');
const exportImage = document.getElementById('exportImage');



//click on the pdf button to generate pdf of dashboard
function generatePDF() {
    viz.showExportPDFDialog()
}

exportPDF.addEventListener("click", function () {
    generatePDF();
  });

//click on image to generate image of dashboard
function generateImage() {
    viz.showExportImageDialog()
}

exportImage.addEventListener("click", function () {
    generateImage();
  });


function getRangeValues() {
    //get values from input
    const minValue = document.getElementById("minValue").value;
    const maxValue = document.getElementById("maxValue").value;
    //get the workbook object
    const workbook = viz.getWorkbook();
    //get the active sheet in the window - this is the dashboard
    const activeSheet = workbook.getActiveSheet();
    //get all the sheets in the dashboard
    const sheets = activeSheet.getWorksheets();
    const sheetToFilter = sheets[3];
    console.log(sheets);

    sheetToFilter.applyRangeFilterAsync("Profit", {
        min: minValue, 
        max: maxValue
    }).then(console.log("Filter applied"));
};

document.getElementById('applyFilter').addEventListener('click', function()
{
    getRangeValues();
});

document.getElementById("btn").addEventListener("click", clearFilters);

function clearFilters() {
    //get the workbook object
    const workbook = viz.getWorkbook();
    //get the active sheet in the window - this is the dashboard
    const activeSheet = workbook.getActiveSheet().getWorksheets().get("map");
    console.log(workbook.activeSheet)
    activeSheet.clearFilterAsync("Profit");
};

