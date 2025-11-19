import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { backendAPI } from '@/api';

interface QnAFormData {
  question_type: string;
  question_title: string;
  question_content: string;
}

interface AnswerFormData {
  question_answer: string;
}

const TYPE_MAP: Record<string, string> = {
  '문의': 'inquiry',
  '제안': 'suggestion',
};

const TYPE_MAP_REVERSE: Record<string, string> = {
  'inquiry': '문의',
  'suggestion': '제안',
};

export function useGetProductQnA(productId: number) {
  return useQuery({
    queryKey: ['productQnA', productId],
    queryFn: async () => {
      const res = await backendAPI.get(`/products/${productId}/qna`);
      
      const data = res.data?.map((item: any) => ({
        ...item,
        question_type: TYPE_MAP_REVERSE[item.question_type] || item.question_type
      })) ?? [];
      
      return data;
    },
  });
}

export function useCreateQnA(productId: number) {
  const queryClient = useQueryClient();


  return useMutation({
    mutationFn: async (data: QnAFormData) => {
      const requestData = {
        question_type: TYPE_MAP[data.question_type] || 'inquiry',
        question_title: data.question_title,
        question_content: data.question_content,
        product: Number(productId)
      };

      const res = await backendAPI.post('/qna', requestData);
      return res.data;
    },
    onSuccess: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      await queryClient.refetchQueries({
        queryKey: ['productQnA', productId],
        exact: true
      });
    },
  });
}

export function useUpdateQnA(productId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ qnaId, data }: { qnaId: number; data: QnAFormData }) => {
      const requestData = {
        question_type: TYPE_MAP[data.question_type] || 'inquiry',
        question_title: data.question_title,
        question_content: data.question_content,
      };
      
      const res = await backendAPI.patch(`/qna/${qnaId}`, requestData);
      return res.data;
    },
    onSuccess: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      await queryClient.refetchQueries({
        queryKey: ['productQnA', productId],
      });
    },
  });
}

export function useDeleteQnA(productId: number) {
  const queryClient = useQueryClient();


  return useMutation({
    mutationFn: async (qnaId: number) => {
      const res = await backendAPI.delete(`/qna/${qnaId}`);
      return res.data;
    },
    onSuccess: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      await queryClient.refetchQueries({
        queryKey: ['productQnA', productId],
      });
    },
  });
}

export function useAnswerQnA(productId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ qnaId, data }: { qnaId: number; data: AnswerFormData }) => {
      const res = await backendAPI.patch(`/qna/${qnaId}`, data);
      return res.data;
    },
    onSuccess: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      await queryClient.refetchQueries({
        queryKey: ['productQnA', productId],
      });
    },
  });
}