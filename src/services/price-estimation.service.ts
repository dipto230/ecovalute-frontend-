
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface IPriceSource {
  sourceName: string;
  productName: string;
  price: string | number;
  sourceUrl: string;
  scrapedAt?: string;
}

export interface IImagePriceEstimate {
  id: string;
  imageUrl: string;
  detectedCategory: string;
  detectedBrand: string | null;
  detectedModel: string | null;
  condition: string;
  detectionConfidence: number;
  aiModel: string;
  aiPredictedPrice: string | number;
  averagePrice: string | number;
  lowestPrice: string | number;
  highestPrice: string | number;
  confidenceScore: number;
  sources: IPriceSource[];
}

interface IEstimateResponse {
  success: boolean;
  message: string;
  data: IImagePriceEstimate;
}


export interface IEWasteRecoveryMaterial {
  id: string;
  materialName: string;
  estimatedWeightMinGrams: number;
  estimatedWeightMaxGrams: number;
  recoveryRate: number;
  recoveredWeightMinGrams: number;
  recoveredWeightMaxGrams: number;
  pricePerKg: string | number;
  estimatedValueMin: string | number;
  estimatedValueMax: string | number;
  confidenceScore: number;
  notes?: string | null;
}

export interface IEWasteRecoveryReport {
  id: string;
  imagePriceEstimateId: string;
  deviceCategory: string;
  deviceBrand: string | null;
  deviceModel: string | null;
  estimatedWeightMinGrams: number;
  estimatedWeightMaxGrams: number;
  estimatedGrossValueMin: string | number;
  estimatedGrossValueMax: string | number;
  processingCostMin: string | number;
  processingCostMax: string | number;
  estimatedNetValueMin: string | number;
  estimatedNetValueMax: string | number;
  currency: string;
  recommendation: string;
  recommendationReason: string;
  assumptions: string;
  confidenceScore: number;
  aiModel: string;
  materials: IEWasteRecoveryMaterial[];
}


export const estimateImagePrice = async (
  image: File
): Promise<IImagePriceEstimate> => {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured.");
  }

  const formData = new FormData();
  formData.append("image", image);

  const response = await axios.post<IEstimateResponse>(
    `${API_BASE_URL}/price-estimation/image`,
    formData,
    {
      timeout: 120000,
    }
  );

  return response.data.data;
};
