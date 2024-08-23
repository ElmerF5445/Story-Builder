let SB_Editor_Data = {
    "Metadata": {
        "Article_Banner": "https://elmerf5445.github.io/Article-Builder/Assets/Background/Splash.png",
        "Article_Title": null,
        "Article_Title_Height": null,
        "Article_Author": null,
        "Article_Category": null,
        "Article_PublishingDate": null
    },
    "Contents": [
        // {
        //     "Type": "Primary_Title",
        //     "Content": null,
        //     "Height": null
        // },
        // {
        //     "Type": "Secondary_Title",
        //     "Content": null,
        //     "Height": null
        // },
        // {
        //     "Type": "Paragraph",
        //     "Content": null,
        //     "Height": null
        // },
        // {
        //     "Type": "Image",
        //     "Source": null,
        //     "Description": null,
        //     "Credits": null 
        // },
        // {
        //     "Type": "Numbered_List",
        //     "Header": null,
        //     "Content": null
        // },
        // {
        //     "Type": "Bulleted_List",
        //     "Header": null,
        //     "Content": null
        // },
        // {
        //     "Type": "Quote",
        //     "Content": null,
        //     "Source": null
        // },
        // {
        //     "Type": "Video",
        //     "Source": null
        // }
        // {
        //     "Type": "Dialog",
        //     "Character": null,
        //     "Dialog": null,
        //     "Tags": null
        // }
    ]
}

function Editor_Element_Add(Type){
    let Editor_Element_Content = {};
    if(Type == "Primary_Title"){
        Editor_Element_Content = {
            "Type": "Primary_Title",
            "Content": "",
            // "Height": "69px"
        }
    }
    if (Type == "Secondary_Title"){
        Editor_Element_Content = {
            "Type": "Secondary_Title",
            "Content": "",
            // "Height": "63px"
        }
    }
    if (Type == "Paragraph"){
        Editor_Element_Content = {
            "Type": "Paragraph",
            "Content": "",
            // "Height": "56px"
        }
    }
    if (Type == "Image"){
        Editor_Element_Content = {
            "Type": "Image",
            "Source": "",
            "Description": "",
            "Credits": "" 
        }
    }
    if (Type == "Numbered_List"){
        Editor_Element_Content = {
            "Type": "Numbered_List",
            "Header": "",
            "Content": ""
        }
    }
    if (Type == "Bulleted_List"){
        Editor_Element_Content = {
            "Type": "Bulleted_List",
            "Header": "",
            "Content": ""
        }
    }
    if (Type == "Quote"){
        Editor_Element_Content = {
            "Type": "Quote",
            "Content": "",
            "Source": ""
        }
    }
    if (Type == "Video"){
        Editor_Element_Content = {
            "Type": "Video",
            "Source": ""
        }
    }
    if (Type == "Dialog"){
        Editor_Element_Content = {
            "Type": "Dialog",
            "Character": "",
            "Dialog": "",
            "Tags": ""
        }
    }

    SB_Editor_Data.Contents.push(Editor_Element_Content);
    Editor_Article_Render();
}

function Editor_Element_Delete(Item){
    SB_Editor_Data.Contents.splice(Item, 1);
    Editor_Article_Render();
}

var Editor_Element_Rearrange_Switch_State = 0; // 0 - Inactive, 1 - Element 1 selected, do swap
var Editor_Element_Rearrange_Switch_Element_1;
var Editor_Element_Rearrange_Switch_Element_1_Index;
var Editor_Element_Rearrange_Switch_Element_2;
var Editor_Element_Rearrange_Switch_Element_2_Index;
function Editor_Element_Rearrange_Switch(Item, ID){
    if (Editor_Element_Rearrange_Switch_State == 0){
        Editor_Element_Rearrange_Switch_Element_1 = SB_Editor_Data.Contents[Item];
        Editor_Element_Rearrange_Switch_Element_1_Index = Item;
        Element_Attribute_Set(ID, "State", "Selected");
        Editor_Element_Rearrange_Switch_State = 1;
    } else if (Editor_Element_Rearrange_Switch_State == 1){
        Editor_Element_Rearrange_Switch_Element_2 = SB_Editor_Data.Contents[Item];
        Editor_Element_Rearrange_Switch_Element_2_Index = Item;

        SB_Editor_Data.Contents[Editor_Element_Rearrange_Switch_Element_1_Index] = Editor_Element_Rearrange_Switch_Element_2;
        SB_Editor_Data.Contents[Editor_Element_Rearrange_Switch_Element_2_Index] = Editor_Element_Rearrange_Switch_Element_1;
        Editor_Element_Rearrange_Switch_State = 0;

        Editor_Article_Render();
    }
}

function Editor_Element_Rearrange_Insert(Index_Above, Index_Below){
    if (Editor_Element_Rearrange_Switch_State == 1){
        SB_Editor_Data.Contents.splice(Editor_Element_Rearrange_Switch_Element_1_Index, 1);
        SB_Editor_Data.Contents.splice(Index_Below, 0, Editor_Element_Rearrange_Switch_Element_1);
        
        Editor_Element_Rearrange_Switch_State = 0;
        
        Editor_Article_Render();
    }
}

function Editor_Element_JumpTo(ID){
    document.getElementById(ID).scrollIntoView();
}

function Editor_Article_Render(){
    Editor_Element_Rearrange_Switch_State = 0;
    document.getElementById("SB_Editor_Content").innerHTML = "";
    document.getElementById("SB_Sidebar_List").innerHTML = "";
    // Set header values
    document.getElementById("SB_Editor_Header_Title").value = SB_Editor_Data.Metadata.Article_Title;
    document.getElementById("SB_Editor_Header_Title").style.height = SB_Editor_Data.Metadata.Article_Title_Height;
    document.getElementById("SB_Editor_Header_Author").value = SB_Editor_Data.Metadata.Article_Author;
    document.getElementById("SB_Editor_Header_Category").value = SB_Editor_Data.Metadata.Article_Category;
    document.getElementById("SB_Editor_Header_DatePublished").value = SB_Editor_Data.Metadata.Article_PublishingDate;

    // Generate inputs and sidebar items
    for (a = 0; a < SB_Editor_Data.Contents.length; a++){
        var Object = SB_Editor_Data.Contents[a];
        var Element_InnerHTML = ``;
        var Sidebar_InnerHTML = ``;

        Sidebar_InnerHTML = `
            <div class="SB_Sidebar_List_Item" id="Sidebar_${a}">
                <div class="SB_Sidebar_List_Item_Content" onclick="Editor_Element_Rearrange_Switch(${a}, this.parentNode.id)">
                    <p class="SB_Sidebar_List_Item_Type">
                        ${Object.Type}
                    </p>
                    <p class="SB_Sidebar_List_Item_Text">
                        ${Object.Content}
                    </p>
                </div>
                <img class='SB_Sidebar_List_Item_Jump' src='Assets/Icons/iconNew_link.png' draggable='false' loading='lazy' onclick="Editor_Element_JumpTo('Element_${a}')"/>
                <img class='SB_Sidebar_List_Item_Delete' src='Assets/Icons/iconNew_delete.png' draggable='false' loading='lazy' onclick="Editor_Element_Delete('${a}')"/>
            </div>
            <div class="SB_Sidebar_List_Item_Inserter" id="Insert_${a}" onclick="Editor_Element_Rearrange_Insert(${a}, ${a + 1})">
                <p class="SB_Sidebar_List_Item_Inserter_Text">
                    Insert between
                </p>
            </div>
        `;

        if (Object.Type == "Primary_Title"){
            Element_InnerHTML = `
                <textarea type="text" class="Input_Text_Long SB_Editor_Input SB_Element_Title" id="Element_${a}" autocomplete="off" Autoresize="true" placeholder="Primary title" Element_Type="Title_Primary" value="${Object.Content}" onchange="Editor_Article_Data_Update(), TextArea_SnapToSize(this.id)"></textarea>
            `;
        }
        if (Object.Type == "Secondary_Title"){
            Element_InnerHTML = `
                <textarea type="text" class="Input_Text_Long SB_Editor_Input SB_Element_Title" id="Element_${a}" autocomplete="off" Autoresize="true" placeholder="Secondary title" Element_Type="Title_Secondary" value="${Object.Content}" onchange="Editor_Article_Data_Update(), TextArea_SnapToSize(this.id)"></textarea>
            `;
        }
        if (Object.Type == "Paragraph"){
            Element_InnerHTML = `
                <textarea type="text" class="Input_Text_Long SB_Editor_Input SB_Element_Paragraph" id="Element_${a}" autocomplete="off" Autoresize="true" placeholder="Paragraph" Element_Type="Paragraph" value="${Object.Content}" onchange="Editor_Article_Data_Update(), TextArea_SnapToSize(this.id)"></textarea>
            `;
        }
        if (Object.Type == "Image"){
            Element_InnerHTML = `
                <div class="SB_Element_Image" Element_Type="Image" id="Element_${a}">
                    <img class='SB_Element_Image_Image' src='${Object.Source}' draggable='false' loading='lazy'/>
                    <input type="text" class="Input_Text SB_Editor_Input Image_Source" id="" autocomplete="off" placeholder="Source" value="${Object.Source}" onchange="Editor_Article_Data_Update()"/>
                    <input type="text" class="Input_Text SB_Editor_Input Image_Description" id="" autocomplete="off" placeholder="Description" value="${Object.Description}" onchange="Editor_Article_Data_Update()"/>
                    <input type="text" class="Input_Text SB_Editor_Input Image_Credits" id="" autocomplete="off" placeholder="Credits" value="${Object.Credits}" onchange="Editor_Article_Data_Update()"/>
                </div>
            `;
            Sidebar_InnerHTML = `
                <div class="SB_Sidebar_List_Item" id="Sidebar_${a}">
                    <div class="SB_Sidebar_List_Item_Content" onclick="Editor_Element_Rearrange_Switch(${a}, this.parentNode.id)">
                        <p class="SB_Sidebar_List_Item_Type">
                            ${Object.Type}
                        </p>
                        <p class="SB_Sidebar_List_Item_Text">
                            ${Object.Description}
                        </p>
                    </div>
                    <img class='SB_Sidebar_List_Item_Jump' src='Assets/Icons/iconNew_link.png' draggable='false' loading='lazy' onclick="Editor_Element_JumpTo('Element_${a}')"/>
                    <img class='SB_Sidebar_List_Item_Delete' src='Assets/Icons/iconNew_delete.png' draggable='false' loading='lazy' onclick="Editor_Element_Delete('${a}')"/>
                </div>
                <div class="SB_Sidebar_List_Item_Inserter" id="Insert_${a}" onclick="Editor_Element_Rearrange_Insert(${a}, ${a + 1})">
                <p class="SB_Sidebar_List_Item_Inserter_Text">
                    Insert between
                </p>
            </div>
            `;
        }
        if (Object.Type == "Numbered_List"){
            Element_InnerHTML = `
                <div class="SB_Element_List" Element_Type="Numbered_List" id="Element_${a}">
                    <input type="text" class="Input_Text SB_Editor_Input List_Header" id="" autocomplete="off" placeholder="Numbered list header" onchange="Editor_Article_Data_Update()"/>
                    <textarea type="text" class="Input_Text_Long SB_Editor_Input List_Contents" id="" autocomplete="off" Autoresize="true" placeholder="List contents (Use line breaks to separate line items)" onchange="Editor_Article_Data_Update()"></textarea>
                </div>
            `;
            Sidebar_InnerHTML = `
                <div class="SB_Sidebar_List_Item" id="Sidebar_${a}">
                    <div class="SB_Sidebar_List_Item_Content" onclick="Editor_Element_Rearrange_Switch(${a}, this.parentNode.id)">
                        <p class="SB_Sidebar_List_Item_Type">
                            ${Object.Type}
                        </p>
                        <p class="SB_Sidebar_List_Item_Text">
                            ${Object.Header}
                        </p>
                    </div>
                    <img class='SB_Sidebar_List_Item_Jump' src='Assets/Icons/iconNew_link.png' draggable='false' loading='lazy' onclick="Editor_Element_JumpTo('Element_${a}')"/>
                    <img class='SB_Sidebar_List_Item_Delete' src='Assets/Icons/iconNew_delete.png' draggable='false' loading='lazy' onclick="Editor_Element_Delete('${a}')"/>
                </div>
                <div class="SB_Sidebar_List_Item_Inserter" id="Insert_${a}" onclick="Editor_Element_Rearrange_Insert(${a}, ${a + 1})">
                <p class="SB_Sidebar_List_Item_Inserter_Text">
                    Insert between
                </p>
            </div>
            `;
        }
        if (Object.Type == "Bulleted_List"){
            Element_InnerHTML = `
                <div class="SB_Element_List" Element_Type="Bulleted_List" id="Element_${a}">
                    <input type="text" class="Input_Text SB_Editor_Input List_Header" id="" autocomplete="off" placeholder="Bulleted list header" onchange="Editor_Article_Data_Update()"/>
                    <textarea type="text" class="Input_Text_Long SB_Editor_Input List_Contents" id="" autocomplete="off" Autoresize="true" placeholder="List contents (Use line breaks to separate line items)" onchange="Editor_Article_Data_Update()"></textarea>
                </div>
            `;
            Sidebar_InnerHTML = `
                <div class="SB_Sidebar_List_Item" id="Sidebar_${a}">
                    <div class="SB_Sidebar_List_Item_Content" onclick="Editor_Element_Rearrange_Switch(${a}, this.parentNode.id)">
                        <p class="SB_Sidebar_List_Item_Type">
                            ${Object.Type}
                        </p>
                        <p class="SB_Sidebar_List_Item_Text">
                            ${Object.Header}
                        </p>
                    </div>
                    <img class='SB_Sidebar_List_Item_Jump' src='Assets/Icons/iconNew_link.png' draggable='false' loading='lazy' onclick="Editor_Element_JumpTo('Element_${a}')"/>
                    <img class='SB_Sidebar_List_Item_Delete' src='Assets/Icons/iconNew_delete.png' draggable='false' loading='lazy' onclick="Editor_Element_Delete('${a}')"/>
                </div>
                <div class="SB_Sidebar_List_Item_Inserter" id="Insert_${a}" onclick="Editor_Element_Rearrange_Insert(${a}, ${a + 1})">
                <p class="SB_Sidebar_List_Item_Inserter_Text">
                    Insert between
                </p>
            </div>
            `;
        }
        if (Object.Type == "Quote"){
            Element_InnerHTML = `
                <div class="SB_Element_Quote" Element_Type="Quote" id="Element_${a}">
                    <h1 class="SB_Element_Quote_Apostrophe Apostrophe_1">
                        "
                    </h1>
                    <textarea type="text" class="Input_Text_Long SB_Editor_Input SB_Element_Quote_Contents Quote_Content" id="" autocomplete="off" Autoresize="true" placeholder="Quote" onchange="Editor_Article_Data_Update()"></textarea>
                    <h1 class="SB_Element_Quote_Apostrophe Apostrophe_2">
                        "
                    </h1>
                    <input type="text" class="Input_Text SB_Editor_Input SB_Element_Quote_Source Quote_Source" id="" autocomplete="off" placeholder="Source" onchange="Editor_Article_Data_Update()"/>
                </div>
            `;
        }
        if (Object.Type == "Video"){
            Element_InnerHTML = `
                <div class="SB_Element_Video" Element_Type="Video" id="Element_${a}">
                    <iframe class="SB_Element_Video_Video" src="${Object.Source}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen=""></iframe>
                    <input type="text" class="Input_Text SB_Editor_Input Video_Source" id="" autocomplete="off" placeholder="Source" onchange="Editor_Article_Data_Update()"/>
                </div>
            `;
            Sidebar_InnerHTML = `
                <div class="SB_Sidebar_List_Item" id="Sidebar_${a}">
                    <div class="SB_Sidebar_List_Item_Content" onclick="Editor_Element_Rearrange_Switch(${a}, this.parentNode.id)">
                        <p class="SB_Sidebar_List_Item_Type">
                            ${Object.Type}
                        </p>
                        <p class="SB_Sidebar_List_Item_Text">
                            ${Object.Source}
                        </p>
                    </div>
                    <img class='SB_Sidebar_List_Item_Jump' src='Assets/Icons/iconNew_link.png' draggable='false' loading='lazy' onclick="Editor_Element_JumpTo('Element_${a}')"/>
                    <img class='SB_Sidebar_List_Item_Delete' src='Assets/Icons/iconNew_delete.png' draggable='false' loading='lazy' onclick="Editor_Element_Delete('${a}')"/>
                </div>
                <div class="SB_Sidebar_List_Item_Inserter" id="Insert_${a}" onclick="Editor_Element_Rearrange_Insert(${a}, ${a + 1})">
                <p class="SB_Sidebar_List_Item_Inserter_Text">
                    Insert between
                </p>
            </div>
            `;
        }
        if (Object.Type == "Dialog"){
            Element_InnerHTML = `
                <div class="SB_Element_Dialog" Element_Type="Dialog" id="Element_${a}">
                    <input type="text" class="Input_Text SB_Editor_Input SB_Element_Dialog_Character" id="" autocomplete="off" placeholder="Character" onchange="Editor_Article_Data_Update()"/>
                    <p class="General_Paragraph">
                        :
                    </p>
                    <textarea type="text" class="Input_Text_Long SB_Editor_Input SB_Element_Dialog_Text" id="" autocomplete="off" Autoresize="true" placeholder="Dialog" onchange="Editor_Article_Data_Update()"></textarea>
                </div>
            `;
            Sidebar_InnerHTML = `
                <div class="SB_Sidebar_List_Item" id="Sidebar_${a}">
                    <div class="SB_Sidebar_List_Item_Content" onclick="Editor_Element_Rearrange_Switch(${a}, this.parentNode.id)">
                        <p class="SB_Sidebar_List_Item_Type">
                            ${Object.Type}
                        </p>
                        <p class="SB_Sidebar_List_Item_Text">
                            ${Object.Character}
                        </p>
                    </div>
                    <img class='SB_Sidebar_List_Item_Jump' src='Assets/Icons/iconNew_link.png' draggable='false' loading='lazy' onclick="Editor_Element_JumpTo('Element_${a}')"/>
                    <img class='SB_Sidebar_List_Item_Delete' src='Assets/Icons/iconNew_delete.png' draggable='false' loading='lazy' onclick="Editor_Element_Delete('${a}')"/>
                </div>
                <div class="SB_Sidebar_List_Item_Inserter" id="Insert_${a}" onclick="Editor_Element_Rearrange_Insert(${a}, ${a + 1})">
                <p class="SB_Sidebar_List_Item_Inserter_Text">
                    Insert between
                </p>
            </div>
            `;
        }
        var Element = document.createElement('span');
        Element.innerHTML = Element_InnerHTML;

        var Sidebar = document.createElement('span');
        Sidebar.innerHTML = Sidebar_InnerHTML;

        document.getElementById("SB_Editor_Content").appendChild(Element);
        document.getElementById("SB_Sidebar_List").appendChild(Sidebar);
    }
    Editor_Article_Render_Data();
}

function Editor_Article_Render_Data(){
    document.getElementById("SB_Editor_Header_Banner").value = SB_Editor_Data.Metadata.Article_Banner;
    document.getElementById("SB_Editor_Banner_Image").src = SB_Editor_Data.Metadata.Article_Banner;
    document.getElementById("SB_Editor_Header_Title").value = SB_Editor_Data.Metadata.Article_Title;
    document.getElementById("SB_Editor_Header_Title").style.height = SB_Editor_Data.Metadata.Article_Title_Height;
    document.getElementById("SB_Editor_Header_Author").value = SB_Editor_Data.Metadata.Article_Author;
    document.getElementById("SB_Editor_Header_Category").value = SB_Editor_Data.Metadata.Article_Category;
    document.getElementById("SB_Editor_Header_DatePublished").value = SB_Editor_Data.Metadata.Article_PublishingDate;
    for (a = 0; a < SB_Editor_Data.Contents.length; a++){
        var Element = document.getElementById("Element_" + a);
        var Element_Type = SB_Editor_Data.Contents[a].Type;
        if (Element_Type == "Primary_Title"){
            Element.value = SB_Editor_Data.Contents[a].Content;
        }
        if (Element_Type == "Secondary_Title"){
            Element.value = SB_Editor_Data.Contents[a].Content;
        }
        if (Element_Type == "Paragraph"){
            Element.value = SB_Editor_Data.Contents[a].Content;
        }
        if (Element_Type == "Image"){
            Element.querySelector(".Image_Source").value = SB_Editor_Data.Contents[a].Source;
            Element.querySelector(".Image_Description").value = SB_Editor_Data.Contents[a].Description;
            Element.querySelector(".Image_Credits").value = SB_Editor_Data.Contents[a].Credits;
        }
        if (Element_Type == "Numbered_List"){
            Element.querySelector(".List_Header").value = SB_Editor_Data.Contents[a].Header;
            Element.querySelector(".List_Contents").value = SB_Editor_Data.Contents[a].Content;
        }
        if (Element_Type == "Bulleted_List"){
            Element.querySelector(".List_Header").value = SB_Editor_Data.Contents[a].Header;
            Element.querySelector(".List_Contents").value = SB_Editor_Data.Contents[a].Content;
        }
        if (Element_Type == "Quote"){
            Element.querySelector(".Quote_Content").value = SB_Editor_Data.Contents[a].Content;
            Element.querySelector(".Quote_Source").value = SB_Editor_Data.Contents[a].Source;
        }
        if (Element_Type == "Video"){
            Element.querySelector(".Video_Source").value = SB_Editor_Data.Contents[a].Source;
        }
        if (Element_Type == "Dialog"){
            Element.querySelector(".SB_Element_Dialog_Character").value = SB_Editor_Data.Contents[a].Character;
            Element.querySelector(".SB_Element_Dialog_Text").value = SB_Editor_Data.Contents[a].Dialog;
        }
        
    }
    TextArea_SnapToSize_All();
}

function Editor_Article_Data_Update(){
    SB_Editor_Data.Metadata.Article_Banner = document.getElementById("SB_Editor_Header_Banner").value;
    SB_Editor_Data.Metadata.Article_Title = document.getElementById("SB_Editor_Header_Title").value;
    SB_Editor_Data.Metadata.Article_Title_Height = document.getElementById("SB_Editor_Header_Title").style.height;
    SB_Editor_Data.Metadata.Article_Author = document.getElementById("SB_Editor_Header_Author").value;
    SB_Editor_Data.Metadata.Article_Category = document.getElementById("SB_Editor_Header_Category").value;
    SB_Editor_Data.Metadata.Article_PublishingDate = document.getElementById("SB_Editor_Header_DatePublished").value;
    for (a = 0; a < SB_Editor_Data.Contents.length; a++){
        var Element_Type = Element_Attribute_Get("Element_" + a, "Element_Type");
        if (Element_Type == "Title_Primary"){
            SB_Editor_Data.Contents[a].Content = document.getElementById(`Element_${a}`).value;
            // SB_Editor_Data.Contents[a].Height = document.getElementById(`Element_${a}`).style.height;
        }
        if (Element_Type == "Title_Secondary"){
            SB_Editor_Data.Contents[a].Content = document.getElementById(`Element_${a}`).value;
            // SB_Editor_Data.Contents[a].Height = document.getElementById(`Element_${a}`).style.height;
        }
        if (Element_Type == "Paragraph"){
            SB_Editor_Data.Contents[a].Content = document.getElementById(`Element_${a}`).value;
            // SB_Editor_Data.Contents[a].Height = document.getElementById(`Element_${a}`).style.height;
        }
        if (Element_Type == "Image"){
            SB_Editor_Data.Contents[a].Source = document.getElementById(`Element_${a}`).querySelector(".Image_Source").value;
            SB_Editor_Data.Contents[a].Description = document.getElementById(`Element_${a}`).querySelector(".Image_Description").value;
            SB_Editor_Data.Contents[a].Credits = document.getElementById(`Element_${a}`).querySelector(".Image_Credits").value;
        }
        if (Element_Type == "Numbered_List"){
            SB_Editor_Data.Contents[a].Header = document.getElementById(`Element_${a}`).querySelector(".List_Header").value;
            SB_Editor_Data.Contents[a].Content = document.getElementById(`Element_${a}`).querySelector(".List_Contents").value;
        }
        if (Element_Type == "Bulleted_List"){
            SB_Editor_Data.Contents[a].Header = document.getElementById(`Element_${a}`).querySelector(".List_Header").value;
            SB_Editor_Data.Contents[a].Content = document.getElementById(`Element_${a}`).querySelector(".List_Contents").value;
        }
        if (Element_Type == "Quote"){
            SB_Editor_Data.Contents[a].Content = document.getElementById(`Element_${a}`).querySelector(".Quote_Content").value;
            SB_Editor_Data.Contents[a].Source = document.getElementById(`Element_${a}`).querySelector(".Quote_Source").value;
        }
        if (Element_Type == "Video"){
            SB_Editor_Data.Contents[a].Source = document.getElementById(`Element_${a}`).querySelector(".Video_Source").value;
        }
        if (Element_Type == "Dialog"){
            SB_Editor_Data.Contents[a].Character = document.getElementById(`Element_${a}`).querySelector(".SB_Element_Dialog_Character").value;
            SB_Editor_Data.Contents[a].Dialog = document.getElementById(`Element_${a}`).querySelector(".SB_Element_Dialog_Text").value;
        }
    }
    Editor_Article_Render();
}

function Editor_Article_Export(Extension){
    if (document.getElementById('SB_Article_Export_FileName').value != null || document.getElementById('SB_Article_Export_FileName').value != ""){
        let Data = SB_Editor_Data;
        var Data_JSON = JSON.stringify(Data, null, 2);
        const Data_Blob = new Blob([Data_JSON], {type: 'application/json'});
        saveAs(Data_Blob, document.getElementById('SB_Article_Export_FileName').value + Extension);
        Subwindows_Close('SB_Editor_Article_Export');
        Toasts_CreateToast("Assets/Icons/iconNew_download.png", "File exported", "The file will be downloaded shortly.");
    } else {
        Subwindows_Open('SB_Editor_Error_Export_FileNameEmpty');
    }
}

function Editor_Article_Import(){
    var File_Element = document.getElementById("SB_Article_Import_File");
    var File_Element_File = File_Element.files[0];
    const Reader = new FileReader();
    Reader.onload = function(e){
        const Contents = e.target.result;
        const Data_JSON = JSON.parse(Contents);
        SB_Editor_Data = Data_JSON;
        // WLB_WatchList_Data = WLB_WatchList_Raw_Data.WLB_WatchList_Data;
        Editor_Article_Render();
        Toasts_CreateToast("Assets/Icons/iconNew_download.png", "File imported", `File data successfully loaded.`);
    }

    Reader.readAsText(File_Element_File);
    Subwindows_Close("SB_Editor_Article_Import");
}

function Editor_Article_Render_Preview(){
    SB_Renderer_Article_Render(SB_Editor_Data);
    Tabs_ChangeTab_Specific(1, 'Sidebar');
}

function Editor_ElementList_Toggle(){
    if(Element_Attribute_Get("SB_Sidebar", "State") == "Expanded"){
        Element_Attribute_Set("SB_Sidebar", "State", "Collapsed");
    } else {
        Element_Attribute_Set("SB_Sidebar", "State", "Expanded");
    }
}

function Editor_Tag_Add(Tag_Opening, Tag_Closing){
    // Get the currently focused element
    var activeElement = document.activeElement;
 
    // Check if the active element is a textarea or text input
    if (activeElement.tagName.toLowerCase() === 'textarea' || activeElement.tagName.toLowerCase() === 'input') {
        // Get the cursor position
        var start = activeElement.selectionStart;
        var end = activeElement.selectionEnd;
 
        // Get the text content
        var text = activeElement.value;
 
        // Save the current state to the history
     //    textAreaHistory.push({ text: text, start: start, end: end });
 
        // Insert opening and closing tags around the selected text (or at the cursor position if no text is selected)
        var newText = text.slice(0, start) + Tag_Opening + text.slice(start, end) + Tag_Closing + text.slice(end);
 
        // Update the element value with the modified text
        activeElement.value = newText;
 
        // Adjust the cursor position after the inserted tags
        activeElement.selectionStart = start + Tag_Opening.length;
        activeElement.selectionEnd = end + Tag_Opening.length;
    } else {
        console.error('The currently active element is not a textarea or input.');
    }
     
 }
 
 // Listen for Ctrl+B key combination
 document.addEventListener('keydown', function(event) {
     if (event.ctrlKey && event.key === 'b') {
         event.preventDefault();
         Editor_Tag_Add('<b>', '</b>'); 
     }
     if (event.ctrlKey && event.key === 'i') {
         event.preventDefault();
         Editor_Tag_Add('<i>', '</i>'); 
     }
     if (event.ctrlKey && event.key === 'u') {
         event.preventDefault();
         Editor_Tag_Add('<u>', '</u>'); 
     }
     if (event.altKey && event.key === 'u') {
         event.preventDefault();
         Editor_Tag_Add('<ul>', '</ul>'); 
     }
     if (event.altKey && event.key === 'l') {
         event.preventDefault();
         Editor_Tag_Add('<li>', '</li>'); 
     }
     if (event.altKey && event.key === 'o') {
         event.preventDefault();
         Editor_Tag_Add('<ol>', '</ol>'); 
     }
 });