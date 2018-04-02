

const materialNameCells = $('.material-name-wrapper');



const database = {
    "0": "Tetrahydrofurfuryl alcohol undergoes chemoselective hydrogenolysis catalyzed by Rh/SiO2 modified with ReOx species to yield 1,5-pentanediol. It undergoes lanthanum-mediated Michael-type addition reaction with maleate to form alkoxybutanedioic acid.",
    "1": "Product 565555 has been discontinued; however, we still have inventory in stock.",
    "2": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae perferendis odio totam officiis doloribus maiores.",
    "3": "Oxo alcohols are alcohols that are prepared by adding carbon monoxide (CO) and hydrogen to an olefin to obtain an aldehyde using the hydroformylation reaction and then hydrogenating the aldehyde to obtain the alcohol.",
    "4": "A complex combination of hydrocarbons produced by the distillation of products from the hydrogenation of isodecanal from the hydroformylation of nonene. It consists predominantly of C10-11 primary aliphatic alcohols, C18-22 dimer alcohols, C>20 acetals and esters and C>10 acid sodium salts and boils in the range of approximately 215°C to 415°C (419°F to 779°F).",
    "5": "According to the classification provided by companies to ECHA in CLP notifications this substance causes serious eye irritation and causes skin irritation.",
    "6": "This structure is also available as a 2d Mol file or as a computed 3d SD file. The 3d structure may be viewed using Java or Javascript. Other names: Anisole, 2,4,6-tribromo-; Methyl 2,4,6-tribromophenyl ether; 2,4,6-Tribromoanisole",
    "7": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae perferendis odio totam officiis doloribus maiores.",
    "8": "Plasticizers, Lubricants, Surfactants, Additives",
    "9": "Plasticizers, Lubricants, Surfactants, Additives",
    "10": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae perferendis odio totam officiis doloribus maiores.",
    "11": "Tetrahydrofurfuryl alcohol undergoes chemoselective hydrogenolysis catalyzed by Rh/SiO2 modified with ReOx species to yield 1,5-pentanediol. It undergoes lanthanum-mediated Michael-type addition reaction with maleate to form alkoxybutanedioic acid."
}



for (let materialCell of materialNameCells) {
    let isClicked = false;
    const initialCellValue = materialCell.firstElementChild.textContent;

    $(materialCell).on('click', () => {

        let elementIndex = $(materialCell).attr('data-index');
        
        if (isClicked === false) {
            materialCell.innerHTML += `<div class="material-accordion-text material-accordion-text-hidden">
                                        <p>${database[elementIndex]}</p>
                                        <span class="material-name-icon icon-close"></span>
                                        </div>`;
            isClicked = !isClicked;
            
            setTimeout(() => {
                $('.material-accordion-text').removeClass('material-accordion-text-hidden')
            }, 100);
            
            
        } else {
            materialCell.textContent = initialCellValue;
            isClicked = !isClicked;
        }
    });
}