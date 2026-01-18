import { AxiosError } from 'axios';

export interface FriendlyError {
  message: string;
  status?: number;
}

export const handleAxiosError = (error: AxiosError): FriendlyError => {
  let message = 'Đã xảy ra lỗi. Vui lòng thử lại sau.';
  let status: number | undefined;

  if (error.response) {
    status = error.response.status;
    
    const serverData = error.response.data as Record<string, unknown> | undefined;
    const serverMessage =
      typeof serverData === 'object' && serverData !== null
        ? (serverData.message as string | undefined) ??
          (serverData.error as string | undefined) ??
          (serverData.detail as string | undefined)
        : undefined;
    console.log('Server message:', serverMessage);
    switch (status) {
      case 400:
        message = serverMessage || 'Yêu cầu không hợp lệ. Vui lòng kiểm tra lại.';
        break;
      case 401:
      case 403:
        message = 'Không có quyền truy cập.';
        break;
      case 404:
        message = serverMessage || 'Không tìm thấy dữ liệu.';
        break;
      case 429:
        message = 'Quá nhiều yêu cầu, vui lòng chờ một chút.';
        break;
      case 500:
      case 502:
      case 503:
      case 504:
        message = 'Máy chủ đang gặp sự cố tạm thời. Vui lòng thử lại sau.';
        break;
      default:
        message = serverMessage || `Lỗi từ máy chủ (mã ${status}).`;
    }
  } else if (error.request) {
    message = 'Không kết nối được đến máy chủ. Vui lòng kiểm tra internet.';
  } else {
    message = error.message || 'Lỗi không xác định.';
  }

  return { message, status };
};