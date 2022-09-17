import React from 'react';
import { UserAuth } from '../context/AuthContext';
import { CheatTips } from '../context/TipsContext';
import TipItem from './TipItem';

const MyTips = () => {
    const { user } = UserAuth();
    const { tips } = CheatTips();

    const tipsToValidate = tips.filter((tip) => {
        return tip.userID === user.uid && tip.verified === false ? tip : '';
    });

    const tipsValidated = tips.filter((tip) => {
        return tip.userID === user.uid && tip.verified === true ? tip : '';
    });

    return (
        <div className="max-w-[1200px] mx-auto ">
            <h1 className="text-5xl font-bold text-center py-10">Mes tips</h1>

            <div className="w-64 shadow bg-primary text-primary-content ml-5 rounded-md mb-3 md:mb-0">
                <div className="stat">
                    <div className="stat-title text-black opacity-100">Nombre de tip{tipsValidated.length > 1 ? 's' : ''}</div>
                    <div className="stat-value">{tipsValidated.length}</div>
                </div>
            </div>

            {tipsToValidate.length > 0 && (
                <div className="tips-to-validate py-3 px-5">
                    <h2 className="text-3xl font-bold py-3">
                        En attente de validation : {tipsToValidate.length} tip{tipsToValidate.length > 1 ? 's' : ''}{' '}
                    </h2>
                    <div className="tips-to-validate-list opacity-50">
                        {tipsToValidate.map((tip) => (
                            <TipItem key={tip.id} tip={tip} showControl />
                        ))}
                    </div>
                    <hr />
                </div>
            )}

            <div className="tips-list py-3 px-5">
                {tipsValidated.map((tip) => (
                    <TipItem key={tip.id} tip={tip} showControl />
                ))}
            </div>
        </div>
    );
};

export default MyTips;
