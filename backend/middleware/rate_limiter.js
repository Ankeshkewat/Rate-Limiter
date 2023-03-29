
const { UserModel } = require('../model/User.model')

const rate_limitor = async (req, res, next) => {
    try {
        const ip = req.ip
        const data = await UserModel.findOne({ ip });
        let rem;
        if (data) {
            rem = data.rem;
        }
        if (data && data.rem > 0) {
            await UserModel.findOneAndUpdate({ ip }, { $set: { rem: rem - 1 } })
            next()
        }
        else if (data && data.rem <= 0) {

            const diff = Math.floor(new Date().getTime() / 1000) - data.time
            console.log(diff)
            if (diff >= 59) {
                await UserModel.findOneAndUpdate({ ip }, { $set: { rem: 9, time: Math.floor(new Date().getTime() / 1000) } })
                next()
            } else {
                await UserModel.findOneAndUpdate({ ip }, { $set: { rem: 0, time: Math.floor(new Date().getTime() / 1000) } })
                res.status(403).send({ "msg": "You you block for 1 minut" })
            }
        }
        else {
            const date = new Date();
            const time = Math.floor(date.getTime() / 1000)
            const payload = new UserModel({ ip, time })
            await payload.save()
            next()
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong")
    }
}

module.exports = { rate_limitor }