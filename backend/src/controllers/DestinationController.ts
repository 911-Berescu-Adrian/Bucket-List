import { RequestHandler } from "express";
import DestinationModel from "../models/destination";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getDestinations: RequestHandler = async (req, res, next) => {
  try {
    const destinations = await DestinationModel.find().exec();
    res.status(200).json(destinations);
  } catch (error) {
    next(error);
  }
};

export const getDestinationById: RequestHandler = async (req, res, next) => {
  const destinationId = req.params.destinationId;
  try {
    if (!mongoose.isValidObjectId(destinationId)) {
      throw createHttpError(400, "Invalid destination ID");
    }
    const destination = await DestinationModel.findById(destinationId).exec();

    if (!destination) {
      throw createHttpError(404, "Destination not found");
    }
    res.status(200).json(destination);
  } catch (error) {
    next(error);
  }
};

interface AddDestinationBody {
  title?: string;
  image?: string;
  description?: string;
  geolocation?: string;
  start_date?: Date;
  end_date?: Date;
}

export const addDestination: RequestHandler<
  unknown,
  unknown,
  AddDestinationBody,
  unknown
> = async (req, res, next) => {
  const title = req.body.title;
  const image = req.body.image;
  const description = req.body.description;
  const geolocation = req.body.geolocation;
  const start_date = req.body.start_date;
  const end_date = req.body.end_date;
  try {
    if (
      !title ||
      !image ||
      !description ||
      !geolocation ||
      !start_date ||
      !end_date
    ) {
      throw createHttpError(400, "Missing required fields");
    }
    const newDestination = await DestinationModel.create({
      title: title,
      image: image,
      description: description,
      geolocation: geolocation,
      start_date: start_date,
      end_date: end_date,
    });

    res.status(201).json(newDestination);
  } catch (error) {
    next(error);
  }
};

export const deleteDestination: RequestHandler = async (req, res, next) => {
  const destinationId = req.params.destinationId;
  try {
    if (!mongoose.isValidObjectId(destinationId)) {
      throw createHttpError(400, "Invalid destination ID");
    }

    const destination = await DestinationModel.findById(destinationId).exec();

    if (!destination) {
      throw createHttpError(404, "Destination not found");
    }

    await destination.deleteOne();

    res.status(200).json({ message: "Destination deleted successfully" });
  } catch (error) {
    next(error);
  }
};

interface UpdateDestinationParams {
  destinationId: string;
}

interface UpdateDestinationBody {
  title?: string;
  image?: string;
  description?: string;
  geolocation?: string;
  start_date?: Date;
  end_date?: Date;
}

export const updateDestination: RequestHandler<
  UpdateDestinationParams,
  unknown,
  UpdateDestinationBody,
  unknown
> = async (req, res, next) => {
  const destinationId = req.params.destinationId;
  const newTitle = req.body.title;
  const newImage = req.body.image;
  const newDescription = req.body.description;
  const newGeolocation = req.body.geolocation;
  const newStartDate = req.body.start_date;
  const newEndDate = req.body.end_date;
  try {
    if (!mongoose.isValidObjectId(destinationId)) {
      throw createHttpError(400, "Invalid destination ID");
    }
    if (
      !newTitle ||
      !newImage ||
      !newDescription ||
      !newGeolocation ||
      !newStartDate ||
      !newEndDate
    ) {
      throw createHttpError(400, "Missing required fields");
    }
    const destination = await DestinationModel.findById(destinationId).exec();

    if (!destination) {
      throw createHttpError(404, "Destination not found");
    }

    destination.title = newTitle;
    destination.image = newImage;
    destination.description = newDescription;
    destination.geolocation = newGeolocation;
    destination.start_date = newStartDate;
    destination.end_date = newEndDate;

    const updatedDestination = await destination.save();

    res.status(200).json(updatedDestination);
  } catch (error) {
    next(error);
  }
};
