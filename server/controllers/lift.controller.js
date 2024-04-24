const Lift = require('../models/lift.model')
const { successResponse,
    errorResponse,
    catchResponse,
    isEmpty } = require('../utility')

function formatDateTime(date) {
    let formattedDateTime = date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    }) + ' ' + date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });

    formattedDateTime = formattedDateTime.toString();
    return formattedDateTime
}
exports.getall = async function (req, res) {
    try {
        let lift = await Lift.find()
        if (lift == null) {
            return errorResponse(res, {}, 'There is No Lifts available', 400)
        }

        return successResponse(res, lift, 'Lift details', 200)
    } catch (e) {
        return catchResponse(res, {}, e, 'Something went wrong', 500)
    }
}

exports.add = async function (req, res) {
    try {
        let data = {
            passenger_count: req.body.passenger_count,
            from_floor: req.body.from_floor,
            to_floor: req.body.to_floor,
            date_time: formatDateTime(new Date())
        };

        const lift = new Lift(data)
        const resData = await lift.save(data)
        return successResponse(res, resData, 'Lift added successfully', 200)

    } catch (err) {
        return catchResponse(res, err.message, 'Something went wrong', 500)
    }
}

exports.update = async function (req, res) {
    try {
        let id = req.params.id
        let lift = await Lift.find({ "_id": id })
        if (lift == null) {
            return errorResponse(res, {}, 'Lift does not exist', 400)
        }

        let data = {
            passenger_count: req.body.passenger_count,
            from_floor: req.body.from_floor,
            to_floor: req.body.to_floor,
            date_time: formatDateTime(new Date())
        };

        const resData = await Lift.findByIdAndUpdate(
            id, data
        )
        return successResponse(res, resData, 'Lift Updated successfully', 200)

    } catch (err) {
        return catchResponse(res, err.message, 'Something went wrong', 500)
    }
}

exports.delete = async function (req, res) {
    try {
        let id = req.params.id
        let lift = await Lift.find({ "_id": id })
        if (lift == null) {
            return errorResponse(res, {}, 'Lift does not exists', 400)
        }

        await Lift.deleteOne({ "_id": id })

        return successResponse(res, lift, 'Lift deleted successfully', 200)
    } catch (e) {
        console.log(e)
        return catchResponse(res, {}, e, 'Something went wrong', 500)
    }
}

exports.get = async function (req, res) {
    try {
        let id = req.params.id
        let lift = await Lift.find({ "_id": id })
        if (lift == null) {
            return errorResponse(res, {}, 'Lift does not exists', 400)
        }

        return successResponse(res, lift, 'Lift deleted successfully', 200)
    } catch (e) {
        console.log(e)
        return catchResponse(res, {}, e, 'Something went wrong', 500)
    }
}