"use strict";
//笑死，这人竟然还先用AES加密
//真的是用中心法则加密
const key = 
    "The Central Dogma. " +
    "This states that once \"information\" has passed into protein it cannot get out again. " +
    "In more detail, the transfer of information from nucleic acid to nucleic acid, " +
    "or from nucleic acid to protein may be possible, but transfer from protein to protein, " +
    "or from protein to nucleic acid is impossible. Information means here the precise determination of sequence, " + 
    "either of bases in the nucleic acid or of amino acid residues in the protein.";
const encryptoButton = "encrypto";
const decryptoButton = "decrypto";
const emptyReturnShit = "稍微写点什么吧";
const errorReturnShit = "笑死，这根本没法解密";
const initEncryptoShit= "待加密";
const initDecryptoShit = "待解密";
class CCodonItem{
    codons = []
    protein = ""
    constructor(_protein, _codons){
        this.codons = _codons;
        this.protein = _protein;
    }
    getCondon(){
        return this.codons[Math.floor(Math.random() * this.codons.length)];
    }
    isThis(_protein){
        return this.codons.indexOf(_protein) > -1
    }
}
const aryCodonsMap = [
    new CCodonItem("0", ["UUU", "UUC"]),
    new CCodonItem("1", ["UUA", "UUG", "CUU", "CUC", "CUA", "CUG"]),
    new CCodonItem("2", ["AUU", "AUC", "AUA"]),
    new CCodonItem("3", ["AUG"]),
    new CCodonItem("4", ["GUU", "GUC", "GUA", "GUG"]),
    new CCodonItem("5", ["UCU", "UCC", "UCA", "UCG"]),
    new CCodonItem("6", ["CCU", "CCC", "CCA", "CCG"]),
    new CCodonItem("7", ["ACU", "ACC", "ACA", "ACG"]),
    new CCodonItem("8", ["GCU", "GCC", "GCA", "GCG"]),
    new CCodonItem("9", ["UAU", "UAC"]),
    new CCodonItem("0", ["CAU", "CAC"]),
    new CCodonItem("A", ["CAA", "CAG"]),
    new CCodonItem("B", ["AAU", "AAC"]),
    new CCodonItem("C", ["AAA", "AAG"]),
    new CCodonItem("D", ["GAU", "GAC"]),
    new CCodonItem("E", ["GAA", "GAG"]),
    new CCodonItem("F", ["UGU", "UGC"])
]
function stringToHex(str){
    let val = '';
    for (let i = 0; i < str.length; i++) {
        val += '' + str.charCodeAt(i).toString(16);
    }
    return val.toUpperCase();
}
function hexToString(str){
    str = str.toLowerCase();
    let arr = str.match(/[0-9a-z]{2}/g);
    let val = '';
    for (let i = 0; i < arr.length; i++){
        let temp = parseInt(arr[i], 16);
        val += String.fromCharCode(temp);
    }
    return val;
}
function Encrypto(){
    let encrypArea = document.getElementsByName(encryptoButton)[0];
    if(encrypArea.value == "" || encrypArea.value == initEncryptoShit || encrypArea.value == emptyReturnShit){
        encrypArea.value = emptyReturnShit;
        return;
    }
    let decrypArea = document.getElementsByName(decryptoButton)[0];
    let rawData = stringToHex(CryptoJS.AES.encrypt(encrypArea.value, key).toString());
    let returnData = "";
    for(let i = 0; i < rawData.length; i++){
        for(let j = 0; j < aryCodonsMap.length; j++){
            if(aryCodonsMap[j].protein == rawData[i]){
                returnData += aryCodonsMap[j].getCondon() + " ";
                break;
            }
        }
    }
    decrypArea.value = returnData;
}
function Decrypto(){
    let decrypArea = document.getElementsByName(decryptoButton)[0];
    if(decrypArea.value == "" || decrypArea.value == initDecryptoShit || decrypArea.value == emptyReturnShit || decrypArea.value == errorReturnShit){
        decrypArea.value = errorReturnShit;
        return;
    }
    let encrypArea = document.getElementsByName(encryptoButton)[0];
    let rawData = decrypArea.value.split(" ");
    let returnData = "";
    for(let i = 0; i < rawData.length; i++){
        for(let j = 0; j < aryCodonsMap.length; j++){
            if(aryCodonsMap[j].isThis(rawData[i])){
                returnData += aryCodonsMap[j].protein;
                break;
            }
        }
    }
    encrypArea.value = CryptoJS.AES.decrypt(hexToString(returnData), key).toString(CryptoJS.enc.Utf8);
}