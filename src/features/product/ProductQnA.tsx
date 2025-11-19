import { useState } from 'react';
import type { ProductDetailType } from '@/types';
import { useGetProductQnA, useCreateQnA, useUpdateQnA, useDeleteQnA, useAnswerQnA } from '@/features/product/hooks/useProductQnA';
import { useAuthStore } from '@/features/auth';

interface ProductQnAProps {
  product: ProductDetailType;
}

interface QnAItem {
  id: number;
  question_type: string;
  question_title: string;
  question_content: string;
  question_answer: string | null;
  created_at: string;
  updated_at: string;
  username: string;
  product_name: string;
}

const questionTypes = ['상품', '배송', '반품/교환', '기타'] as const;

export function ProductQnA({ product }: ProductQnAProps) {
  const currentUser = useAuthStore((state) => state.user);
  const isAdmin = currentUser?.is_admin;
  const [isWriting, setIsWriting] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [answerEditingId, setAnswerEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({question_type: '상품', question_title: '', question_content: ''});
  const [answerForm, setAnswerForm] = useState({question_answer: ''});
  const { data: qnaList = [], isLoading } = useGetProductQnA(product.id);
  const createMutation = useCreateQnA(product.id);
  const updateMutation = useUpdateQnA(product.id);
  const deleteMutation = useDeleteQnA(product.id);
  const answerMutation = useAnswerQnA(product.id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createMutation.mutateAsync(formData);
    setIsWriting(false);
    setFormData({ question_type: '상품', question_title: '', question_content: '' });
  };

  const handleEdit = (qna: QnAItem) => {
    setEditingId(qna.id);
    setFormData({
      question_type: qna.question_type,
      question_title: qna.question_title,
      question_content: qna.question_content,
    });
  };

  const handleUpdate = async (qnaId: number) => {
    await updateMutation.mutateAsync({ qnaId, data: formData });
    setEditingId(null);
    setFormData({ question_type: '상품', question_title: '', question_content: '' });
  };

  const handleDelete = async (qnaId: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    await deleteMutation.mutateAsync(qnaId);
    setExpandedId(null);
  };

  const handleAnswerSubmit = async (qnaId: number) => {
    await answerMutation.mutateAsync({ qnaId, data: answerForm });
    setAnswerEditingId(null);
    setAnswerForm({ question_answer: '' });
  };

  if (isLoading) return <div className="py-16 text-center">Loading...</div>;

  return (
    <div className="py-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-primary-700">상품 문의</h3>
        <button
          onClick={() => setIsWriting(!isWriting)}
          className="px-6 py-2 bg-primary-700 text-white rounded text-sm"
        >
          {isWriting ? '취소' : '문의하기'}
        </button>
      </div>

      {isWriting && (
        <div className="bg-white border-2 border-primary-700 rounded-lg p-6 mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {questionTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData({ ...formData, question_type: type })}
                  className={`px-4 py-2 rounded text-sm ${
                    formData.question_type === type
                      ? 'bg-primary-700 text-white'
                      : 'bg-primary-50 text-primary-500-80'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <input
              type="text"
              value={formData.question_title}
              onChange={(e) => setFormData({ ...formData, question_title: e.target.value })}
              className="w-full px-4 py-2 border rounded"
              placeholder="문의 제목"
              required
            />

            <textarea
              value={formData.question_content}
              onChange={(e) =>
                setFormData({ ...formData, question_content: e.target.value })
              }
              rows={5}
              className="w-full px-4 py-2 border rounded"
              placeholder="문의 내용"
              required
            />

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsWriting(false)}
                className="px-6 py-2 bg-white border-2 border-primary-700 rounded">
                취소
              </button>
              <button type="submit" className="px-6 py-2 bg-primary-700 text-white rounded">
                등록
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-3">
        {qnaList.length === 0 ? (
          <div className="text-center py-16 bg-primary-50 rounded-lg">
            <p className="text-4xl mb-4">💬</p>
            <p className="text-primary-500-80">아직 등록된 문의가 없습니다.</p>
          </div>
        ) : (
          qnaList.map((qna: QnAItem) => {
            const isMyQnA = qna.username === currentUser?.username;

            return (
              <div key={qna.id} className="bg-white border rounded-lg overflow-hidden">
                <div
                  onClick={() => setExpandedId(expandedId === qna.id ? null : qna.id)}
                  className="p-4 cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded">
                      Q
                    </span>

                    <div className="flex-1">
                      <h4 className="font-medium">{qna.question_title}</h4>
                      <p className="text-sm text-gray-500">
                        {new Date(qna.created_at).toLocaleDateString('ko-KR')}
                      </p>
                    </div>
                  </div>
                </div>

                {expandedId === qna.id && (
                  <div className="border-t bg-primary-50 p-4 space-y-4">
                    {editingId === qna.id ? (
                      <div className="space-y-4">
                        <input
                          type="text"
                          value={formData.question_title}
                          onChange={(e) =>
                            setFormData({ ...formData, question_title: e.target.value })
                          }
                          className="w-full px-4 py-2 border rounded"
                        />

                        <textarea
                          value={formData.question_content}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              question_content: e.target.value,
                            })
                          }
                          rows={5}
                          className="w-full px-4 py-2 border rounded"
                        />

                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setEditingId(null)}
                            className="px-4 py-2 bg-gray-200 rounded">
                            취소
                          </button>

                          <button
                            onClick={() => handleUpdate(qna.id)}
                            className="px-4 py-2 bg-primary-700 text-white rounded">
                            수정 완료
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-sm whitespace-pre-wrap">
                          {qna.question_content}
                        </p>

                        {isMyQnA && !qna.question_answer && (
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleEdit(qna)}
                              className="px-4 py-2 text-sm bg-white border rounded">
                              수정
                            </button>
                            <button
                              onClick={() => handleDelete(qna.id)}
                              className="px-4 py-2 text-sm bg-[#EAD5CE] text-white rounded">
                              삭제
                            </button>
                          </div>
                        )}

                        {qna.question_answer && (
                          <div className="bg-white border-l-4 border-primary-600 p-4 rounded">
                            <div className="flex items-start gap-3">
                              <span className="px-2 py-1 bg-primary-700 text-white text-xs rounded">
                                A
                              </span>
                              <p className="flex-1 text-sm text-primary-500-80 whitespace-pre-wrap">
                                {qna.question_answer}
                              </p>
                            </div>
                          </div>
                        )}

                        {isAdmin && (
                          <div className="space-y-2">
                            {answerEditingId === qna.id ? (
                              <>
                                <textarea
                                  value={answerForm.question_answer}
                                  onChange={(e) =>
                                    setAnswerForm({
                                      question_answer: e.target.value,
                                    })
                                  }
                                  className="w-full px-4 py-2 border rounded"
                                  rows={3}
                                />
                                <button
                                  onClick={() => handleAnswerSubmit(qna.id)}
                                  className="px-4 py-2 bg-primary-700 text-white rounded">
                                  답변 완료
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => setAnswerEditingId(qna.id)}
                                className="px-4 py-2 bg-white border rounded text-sm">
                                관리자 답변 작성
                              </button>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}