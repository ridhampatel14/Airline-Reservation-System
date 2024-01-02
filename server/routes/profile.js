const express = require('express');
const router = express.Router();
const data = require('../data');
const ProfileData = data.profiles;
const helpers = require('../helper');

router
	.route('/:emailId')
	.get(async (req, res) => {
        try {
            if (!req.params.emailId) throw 'you must provide emailID';
            req.params.emailId = helpers.checkifproperemail(req.params.emailId);
        } catch (e) {
            return res.status(400).json({ error: e });
        }
        try {
            const email = await req.params.emailId
            let val = await ProfileData.getProfile(email);
            res.json(val);
        } catch (e) {
            res.status(404).json({ error: e });
        }
	});

router
    .route('/')
	.post(async (req, res) => {
		let ProfileInfo = req.body;
		try {
			
            await helpers.checkifproperflname(ProfileInfo.firstName)
			
            await helpers.checkifproperflname(ProfileInfo.lastName)
			
            await helpers.checkifproperbirthdate(ProfileInfo.birthDate)
			console.log('bsdfbsvb')
            await helpers.checkifstring(ProfileInfo.Address)
            await helpers.checkifproperemail(ProfileInfo.emailId)
            await helpers.checkifproperphonenumber(ProfileInfo.contactNumber)

		} catch (error) {
			console.log('$$$$',error.message);
			res.status(400).json({ error: error.message });
			return;
		}

		try {
			const newProfile = await ProfileData.createProfile(
				ProfileInfo.firstName,
                ProfileInfo.lastName,
                ProfileInfo.birthDate,
                ProfileInfo.Address,
                ProfileInfo.emailId,
                ProfileInfo.contactNumber,
                ProfileInfo.PassportNo,
			);
			res.json(newProfile);
		} catch (e) {
			res.sendStatus(500);
		}
	});

router
    .route('/checkProfile/:emailId')
    .get(async (req, res) => {
	try {
		if (!req.params.emailId) throw 'you must provide emailID';
		req.params.emailId = helpers.checkifproperemail(req.params.emailId);
	} catch (e) {
		return res.status(400).json({ error: e });
	}
	try {
        const email = await req.params.emailId
		let val = await ProfileData.checkifProfileExist(email);
		res.json(val);
	} catch (e) {
		res.status(404).json({ error: e });
	}
});
module.exports = router;
