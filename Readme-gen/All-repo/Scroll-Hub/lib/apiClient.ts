import { IVideo } from '@/Model/video.model';

/* eslint-disable @typescript-eslint/no-explicit-any */
export type VideoFormData = Omit<IVideo, '_id'>;

type FetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
};

class ApiClient {
  private async fetch<T>(
    endpoint: string,
    options: FetchOptions = {},
  ): Promise<T> {
    const { method = 'GET', body, headers = {} } = options;

    const defaultHeaders = {
      'Content-Type': 'application/json',
      ...headers,
    };

    const response = await fetch(`/api${endpoint}`, {
      method,
      headers: defaultHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  }

  async getVideos() {
    return this.fetch('/videos');
  }
  
  async getUsers() {
    return this.fetch('/user');
  }

  async deleteVideo(id: string) {
    return this.fetch(`/videos?id=${id}`, {
      method: 'DELETE',
    });
  }

  async createVideo(videoData: VideoFormData) {
    return this.fetch<IVideo>('/videos', {
      method: 'POST',
      body: videoData,
    });
  }

    async reportVideo(id: string) {
    return this.fetch(`/report?id=${id}`, {
      method: 'PUT',
    });
  }
}

export const apiClient = new ApiClient();
