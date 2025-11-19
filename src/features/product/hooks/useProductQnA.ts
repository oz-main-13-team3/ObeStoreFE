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

export function useGetProductQnA(productId: number) {
  return useQuery({
    queryKey: ['productQnA', productId],
    queryFn: async () => {
      const res = await backendAPI.get(`/products/${productId}/qna/`);
      return res.data ?? [];
    },
  });
}

export function useCreateQnA(productId: number) {
  const queryClient = useQueryClient();


  return useMutation({
    mutationFn: async (data: QnAFormData) => {
      const res = await backendAPI.post('/qna/', {
        ...data,
        product: productId,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['productQnA', productId],
      });
    },
  });
}

export function useUpdateQnA(productId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ qnaId, data }: { qnaId: number; data: QnAFormData }) => {
      const res = await backendAPI.patch(`/qna/${qnaId}/`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['productQnA', productId],
      });
    },
  });
}

export function useDeleteQnA(productId: number) {
  const queryClient = useQueryClient();


  return useMutation({
    mutationFn: async (qnaId: number) => {
      const res = await backendAPI.delete(`/qna/${qnaId}/`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['productQnA', productId],
      });
    },
  });
}

export function useAnswerQnA(productId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ qnaId, data }: { qnaId: number; data: AnswerFormData }) => {
      const res = await backendAPI.patch(`/qna/${qnaId}/`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['productQnA', productId],
      });
    },
  });
}