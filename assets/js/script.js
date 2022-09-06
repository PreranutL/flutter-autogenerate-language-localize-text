$(document).ready(function() {
    var import_data = {};
    // export localize value sheets from json
    $("#export_localize_value_xlsx").click(function(){
        create_excel();
    });


    // generate single output strings
    $("#submit_single").click(function() {
        let variableNames = $("#uiString").val();
        let engLocalizedValue = $("#engText").val();
        let thLocalizedValue = $("#thText").val();
        let uiStringOutput = "  static String get " + variableNames + " => LanguageLocalizations.getText('" + variableNames + "');";
        let engLocalizedValuesOutput = "'" + variableNames + "': '" + engLocalizedValue + "',";
        let engLocalizedValuesTestOutput = "expect(LanguageLocalizations.getText('" + variableNames + "'), '" + engLocalizedValue + "',);";
        let thLocalizedValuesOutput = "'" + variableNames + "': '" + thLocalizedValue + "',";
        let thLocalizedValuesTestOutput = "expect(LanguageLocalizations.getText('" + variableNames + "'), '" + thLocalizedValue + "',);";
        $("textarea#uiStringOutput").val(uiStringOutput);
        $("textarea#engLocalizedValuesOutput").val(engLocalizedValuesOutput);
        $("textarea#engLocalizedValuesTestOutput").val(engLocalizedValuesTestOutput);
        $("textarea#thLocalizedValuesOutput").val(thLocalizedValuesOutput);
        $("textarea#thLocalizedValuesTestOutput").val(thLocalizedValuesTestOutput);
    });


    function setData(data) {
        import_data = $.parseJSON(data);
    }

    // import excel
    $('#import_data').change(function(e) {
        var reader = new FileReader();
        reader.readAsArrayBuffer(e.target.files[0]);
        reader.onload = function(e) {
            var import_data = e.target.result;
            var workbook = XLSX.read(import_data, {
                type: 'binary'
            });

            workbook.SheetNames.forEach(function(sheetName) {
                var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                var json_object = JSON.stringify(XL_row_object);
                console.log(json_object);
                setData(json_object);
            });
        };

    });


    // clear all fields
    $("#clear").click(function() {
        $('input[type=text]').each(function() {
            $(this).val('');
        });
        $('textarea').each(function() {
            $(this).val('');
        });
    });


        
        $("#import_data_submit").click(function() {
            generate_localize_value()
        });

    // localize_value.dart
    let localizeValueHeader = "/// Localized value for display with specific language \nclass LocalizedText {\n/// Map of localize and map of ui string key and string value \nstatic const localizedValues = <String, Map<String, String>>{ \n";
    let localizeValueEnd = "};\n}";
    // ui_strings.dart
    let uiStringsHeader = "// ignore_for_file: public_member_api_docs \n";    
    let uiStringsImport = "import 'package:common_components/services/localization_service.dart'; \nimport 'package:tuple/tuple.dart';\n";
    let uiStringsClassComments = "/// This is ui strings class for display in application \n/// every field use prefix 'common'\n";
    let uiStringsClass ="class UiStrings { \n";
    let missingString = "/// This is the string to show when there is no string found\n/// in localized values.\n/// This string should NOT be translated.static String get commonStringNotFound => 'missing string';\n";
    // localize_value_test.dart



    function generate_localize_value()
    {
        let localize_value = '';
        let en_value = "'en': {\n";
        let th_value = "'th': {\n";
        let ui_strings = '';
        let ui_strings_value = '';
        for(const key in import_data)
        {
            ui_strings_value =ui_strings_value+ "  static String get " + import_data[key]['variable_name'] + " => LanguageLocalizations.getText('" + import_data[key]['variable_name'] + "');\n";
            en_value = en_value+`'${import_data[key]['variable_name']}':'${import_data[key]['en']}',\n`;
            th_value = th_value+`'${import_data[key]['variable_name']}':'${import_data[key]['thai']}',\n`;
        }
        ui_strings = uiStringsHeader+uiStringsImport+uiStringsClassComments+uiStringsClass+missingString+ui_strings_value+"}\n"
        localize_value = localizeValueHeader +en_value+ "},\n"+th_value+ "},\n"+localizeValueEnd;

        console.log(ui_strings);
        downloadString(ui_strings, "text/dart", "ui_strings.dart");
        downloadString(localize_value, "text/dart", "localized_values.dart")

    }

    // create file and download
    function downloadString(text, fileType, fileName) {
        var blob = new Blob([text], { type: fileType });
      
        var a = document.createElement('a');
        a.download = fileName;
        a.href = URL.createObjectURL(blob);
        a.dataset.downloadurl = [fileType, a.download, a.href].join(':');
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(function() { URL.revokeObjectURL(a.href); }, 1500);
      }

    // creates excel file from localize value json
    function create_excel()
    {
    // dart code
    // inside dartpad copy localize value map then 
    // print(JsonEncoder().convert(localizedValues));
    // copy output json string and paste inside ob                                 
    let inputData = JSON.parse($("#JSON_input").val());

    console.log(inputData);
    let output = [];
    let cellValue ={};
        for (const innerKey in inputData['en']) {
                 cellValue = {
                    "variable_name": innerKey,
                    "thai": inputData['th'][innerKey],
                    "en": inputData['en'][innerKey],
                    // TODO : update common ui strings special function.
                };
            console.log(cellValue);
            output.push(cellValue);
        }
    
    console.log(output);
    console.log(typeof(output)); 
    export_excel(output);
    }

    function export_excel(output) {
        if (typeof XLSX == 'undefined') XLSX = require('xlsx');

        /* make the worksheet */
        var ws = XLSX.utils.json_to_sheet(output);

        /* add to workbook */
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "localize value");

        /* generate an XLSX file */
        XLSX.writeFile(wb, "localize_value.xlsx");
    }







});

