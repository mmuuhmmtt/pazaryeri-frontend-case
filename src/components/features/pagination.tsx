'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { PaginationMeta } from '@/types';

interface PaginationProps {
    meta: PaginationMeta;
    onPageChange: (page: number) => void;
    locale: string;
}

export function Pagination({ meta, onPageChange, locale }: PaginationProps) {
    const { currentPage, totalPages, hasNextPage, hasPreviousPage } = meta;

    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push('...');
                pages.push(currentPage - 1);
                pages.push(currentPage);
                pages.push(currentPage + 1);
                pages.push('...');
                pages.push(totalPages);
            }
        }

        return pages;
    };

    return (
        <div className="mt-12 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-secondary-600 dark:text-secondary-400">
                {locale === 'tr'
                    ? `Sayfa ${currentPage} / ${totalPages} (Toplam ${meta.totalItems} ürün)`
                    : `Page ${currentPage} / ${totalPages} (Total ${meta.totalItems} products)`}
            </p>

            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={!hasPreviousPage}
                >
                    <ChevronLeft className="h-4 w-4" />
                    {locale === 'tr' ? 'Önceki' : 'Previous'}
                </Button>

                <div className="flex gap-1">
                    {getPageNumbers().map((page, index) => {
                        if (page === '...') {
                            return (
                                <span
                                    key={`ellipsis-${index}`}
                                    className="px-3 py-2 text-secondary-500"
                                >
                                    ...
                                </span>
                            );
                        }

                        return (
                            <Button
                                key={page}
                                variant={currentPage === page ? 'primary' : 'outline'}
                                size="sm"
                                onClick={() => onPageChange(page as number)}
                                className="min-w-[40px]"
                            >
                                {page}
                            </Button>
                        );
                    })}
                </div>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={!hasNextPage}
                >
                    {locale === 'tr' ? 'Sonraki' : 'Next'}
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
