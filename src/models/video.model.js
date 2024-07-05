import {Schema, Model} from mongoose;
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = Schema(
    {
        videoFile:{ 
            type: String, // url from cloud
            required: [true, "URL of video file source is required"]
        },
        thumbnail: {
            type: String, //url
            required: true
        },
        title:{
            type: String,
            required: true
        },
        description:{
            type: String,
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        views: {
            type: Number,
            default: 0
        },
        isPublished: {
            type: Boolean,
            default: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },

    },
    {

    }
);

videoSchema.plugin(mongooseAggregatePaginate)
export const Video = Model("Video", videoSchema)
