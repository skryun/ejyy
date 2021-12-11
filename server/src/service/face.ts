import path from 'path';
import '@tensorflow/tfjs-node';
import canvas from 'canvas';
import * as faceApi from '@vladmandic/face-api';
import config from '~/config';

export async function init() {
    const { Canvas, Image, ImageData } = canvas;
    // @ts-ignore
    faceApi.env.monkeyPatch({ Canvas, Image, ImageData });
    // @ts-ignore
    await faceApi.tf.setBackend('tensorflow');
    // @ts-ignore
    await faceApi.tf.ready();

    const modelPath = config.debug ? path.join(__dirname, '../../../weights') : path.join(__dirname, 'weights');

    await faceApi.nets.ssdMobilenetv1.loadFromDisk(modelPath);
    await faceApi.nets.faceLandmark68Net.loadFromDisk(modelPath);
    await faceApi.nets.faceRecognitionNet.loadFromDisk(modelPath);
    await faceApi.nets.faceExpressionNet.loadFromDisk(modelPath);
}

export async function gerDescriptor(src: string): Promise<Float32Array> {
    const img = await canvas.loadImage(`${config.aliyun.oss.host}${src}`);

    const detections = await faceApi
        // @ts-ignore
        .detectAllFaces(img, new faceApi.SsdMobilenetv1Options({ minConfidence: 0.5, maxResults: 3 }))
        .withFaceLandmarks()
        .withFaceDescriptors();

    if (detections.length !== 1) {
        return null;
    }

    return detections[0].descriptor;
}
