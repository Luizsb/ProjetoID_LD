import { useState } from 'react';
import { publicUrl } from '../lib/publicUrl';

interface TeacherButtonProps {
    title?: string;
    content?: React.ReactNode;
    answers?: React.ReactNode;
    visible?: boolean;
    /** Exibe o link do Banco de Questões (só onde fizer sentido no livro). */
    showBancoQuestoes?: boolean;
}

function TeacherButton({
    title,
    content,
    answers,
    visible = true,
    showBancoQuestoes = false,
}: TeacherButtonProps) {
    if (!visible) {
        return null;
    }
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="professor-button"
                style={{
                    ['--professor-icon' as string]: `url("${publicUrl('images/iconTeacher.svg')}")`,
                    ['--professor-icon-sas' as string]: `url("${publicUrl('images/iconTeacher-sas.svg')}")`,
                    ['--professor-icon-geekie' as string]: `url("${publicUrl('images/iconTeacher-geekie.svg')}")`,
                }}
            >
                <span className="professor-button__icone" />
                PARA O PROFESSOR
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        className="professor-button__dialog bg-white rounded-lg p-8 max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <p className="professor-button__titulo">
                                PARA O PROFESSOR
                            </p>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-slate-500 hover:text-slate-700 text-2xl font-bold"
                            >
                                ×
                            </button>
                        </div>

                        {title && (
                            <h4 className="text-xl font-semibold text-slate-700 mb-4">{title}</h4>
                        )}

                        {showBancoQuestoes ? (
                            <p className="mb-4" style={{ color: '#000000' }}>
                                <a
                                    href="https://go.sae.digital/wy0AP6"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-semibold text-[#80298F] underline underline-offset-2 hover:text-[#6a2576]"
                                >
                                    Acesse o Banco de Questões para criar listas extras de exercícios rapidamente.
                                </a>
                            </p>
                        ) : null}

                        {content && (
                            <div className="mb-6">
                                <div className="prose max-w-none" style={{ color: '#000000' }}>
                                    {content}
                                </div>
                            </div>
                        )}

                        {answers && (
                            <div>
                                <h5 className="text-lg font-semibold mb-3" style={{ color: '#000000' }}>Respostas:</h5>
                                <div className="prose max-w-none" style={{ color: '#000000' }}>
                                    {answers}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            )}
        </>
    );
}

export default TeacherButton;
