const reservations = require('../models/reservations');

exports.getReservationById = async (req, res) => {
    try {
        const reservation = await reservations.findById(req.params.id);
        if (!reservation) {
            return res.status(404).json({ message: 'Réservation non trouvée' });
        }
        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}   

exports.add = async (req, res) => {
    const { catwayNumber, clientName, boatName, startDate, endDate } = req.body;
    try {
        const reservation = new reservations({ catwayNumber, clientName, boatName, startDate, endDate });
        await reservation.save();
        res.render('reservations/addReservations', { reservation });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.update = async (req, res) => {  
    const { catwayNumber, clientName, boatName, startDate, endDate } = req.body;
    try {
        const updatedReservation = await reservations.findByIdAndUpdate(
            req.params.id,
            { catwayNumber, clientName, boatName, startDate, endDate },
            { new: true }
        );
        if (!updatedReservation) {
            return res.status(404).json({ message: 'Réservation non trouvée' });
        }
        res.render('reservations/editReservation', { reservation: updatedReservation });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}   
exports.delete = async (req, res) => {
    try {
        const reservation = await reservations.findByIdAndDelete(req.params.id);
        console.log(reservation);  // j'ai ajouté ce log pour voir ce qui est renvoyé
        console.log(id);
        if (!reservation) {
            return res.status(404).json({ message: 'Réservation non trouvée' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getAllReservations = async (req, res) => {
    try {
        const reservationsList = await reservations.find();
        res.render('reservations/list', { reservations: reservationsList });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.showUpdateReservationForm = async (req, res) => {   
    try {
        const reservation = await reservations.findById(req.params.id);
        if (!reservation) {
            return res.status(404).json({ message: 'Réservation non trouvée' });
        }
        res.render('reservations/editReservation', { reservation });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}