const HttpError = require('../models/http-error');
const Transformation = require('../models/transformation');

exports.getTransformations = async (req, res, next) => {
    try {
        const transformations = await Transformation.find().sort({_id: -1});
        res.status(200).json({
            success: true,
            count: transformations.length,
            transformations: transformations.map(transformation =>
                transformation.toObject({getters: true}))
        });
    } catch(err) {
        console.error('Get transformations error:', err);
        const error = new HttpError('Something went wrong, could not find transformations.', 500);
        return next(error);
    }
};

exports.createTransformation = async (req, res, next) => {
    try {
        const {clientName, transformationText, transformationImages} = req.body;

        if(!clientName || !transformationText || !transformationImages) {
            const error = 
            new HttpError('Client name, transformation text and transformation images are required.', 400);
            return next(error);
        }

        const createdTransformation = new Transformation({
            clientName: clientName.trim(),
            transformationText: transformationText.trim(),
            transformationImages: transformationImages.map(image => image.trim())
        });

        const savedTransformation = await createdTransformation.save();

        res.status(201).json({
            success: true,
            message: 'Transformation created successfully',
            transformation: savedTransformation.toObject({getters: true})
        });
    } catch(err) {
        console.error('Create transformation error:', err);
        const error = new HttpError('Something went wrong, could not create transformation.', 500);
        return next(error);
    }
};

exports.deleteTransformation = async (req, res, next) => {
    const transformationId = req.params.tid;

    if(!transformationId) {
        const error = new HttpError('Transformation Id is required.', 400);
        return next(error);
    }

    try{
        const deletedTransformation = await Transformation.findByIdAndDelete(transformationId);

        if(!deletedTransformation) {
            const error = new HttpError('Could not find a transformation for the provided id.', 404);
            return next(error);
        }

        res.status(200).json({
            success: true,
            message: 'Transformation deleted successfully.',
            deletedTransformation: deletedTransformation.toObject({getters: true})
        });
    } catch(err) {
        console.error('Delete transformation error:', err);
        const error = new HttpError('Something went wrong, could not delete transformation.', 500);
        return next(error);
    }
};