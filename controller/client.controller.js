const Client = require('../models/client.model')
require('dotenv').config()
const User = require('../models/user.model')
const Notif = require('../models/user.notification')

module.exports.create = async (req,res) => {
    const {email,nom,prenom,ville,numero,rue,postalCode,tel,genre} = req.body.formData;
    const {idAgent} = req.body;

    const searchClient = await Client.findOne({email: email});

    if(searchClient){
        res.send('clientFinded');
    } else {
        try{
            const newClient = new Client({email: email, nom: nom , prenom: prenom, adresse:{ville: ville, numero: numero, rue: rue, postalCode: postalCode}, tel: tel, idAgent: idAgent, state: 'New',genre: genre, gain: 0, gainPotentiel: 0, date: new Date()})

            newClient.save();
            const filter = {userId: idAgent,text: 'Vous venez de créer une nouvelle fiche. Nous la traiterons bientôt!'}
             await Notif.create(filter);
            res.send('Sucess');
        }catch(err){
            console.log(err);
            res.send('error');
        }
        }
    }

 module.exports.search = async (req,res) => { 
        const {userId} = req.query;
        const filterWait = {idAgent: userId, state: 'en Attente'};
        const filterVal = {idAgent: userId, state: 'valide'}
        const filterAll = {idAgent: userId}

        const ficheWait = await Client.find(filterWait);
        const ficheVal = await Client.find(filterVal);
        const ficheAll = await Client.find(filterAll)

        res.json({
            ficheVal,ficheWait,ficheAll
        });
        
        
 }

 module.exports.gain = async (req,res) => { 
    const {userId} = req.query;
    const filterGain = {idAgent: userId, state: 'valide'};
    const filterGainP = {idAgent: userId, state: 'en Attente'}
    

    const ficheGain = await Client.find(filterGain);
    const ficheGainP = await Client.find(filterGainP);
 

    res.json({ficheGain,ficheGainP});
    
    
}

module.exports.info = async (req,res) => { 
 const filter1 = {state: 'New'};
 const filter2 = {state: 'valide'};
 const filter3 = {state: 'en Attente'};

 const ficheNew = await Client.find(filter1);
 const ficheVal = await Client.find(filter2);
 const ficheWait = await Client.find(filter3);

res.json({ficheWait,ficheVal,ficheNew});
    
    
}

module.exports.delete = async (req,res) => { 
    const {ID} = req.query;
    const filter = {_id: ID}
    const delere = await Client.deleteOne(filter);
     
    const filter1 = {state: 'en Attente'}
    const newFiche = await Client.find(filter1);

    res.send(newFiche);
   }

   module.exports.editSearch = async (req,res) => { 
    const {ID} = req.query;
    const filter = {_id: ID}
    const FicheFinded = await Client.findOne(filter);

    res.send(FicheFinded);
   }

   module.exports.editSubmit = async (req,res) => {
    const {email,nom,prenom,gain,gainPotentiel,ville,numero,rue,postalCode,tel,state} = req.body;
    console.log(state);
    const {id} = req.body;
        const update = {email: email, nom: nom, prenom: prenom, tel:tel,gain: gain, gainPotentiel: gainPotentiel, adresse:{ville: ville, rue: rue,  numero: numero, postalCode: postalCode},state: state,}
        console.log(update);
    const filter = {_id: id};
    const Fiche = await Client.findOneAndUpdate(filter,update,{
        new: true
    });
    res.send('Updated');
   }
