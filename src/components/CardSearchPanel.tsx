import type { CardSearchConditions } from "../types/cardSearchConditions";

type CardSearchPanelProps = {
    conditions: CardSearchConditions;
    onChange: (conditions: CardSearchConditions) => void;
    onSearch: () => void;   
};

export const CardSearchPanel = ({
    conditions,
    onChange,
    onSearch,
}: CardSearchPanelProps) => {
    const colorOptions = [
        {value: "red", label: "赤"},
        {value: "blue", label: "青"},
        {value: "yellow", label: "黄"},
        {value: "green", label: "緑"},
        {value: "purple", label: "紫"},
    ];

    const typeOptions = [
        {value: "character", label: "キャラクター"},
        {value: "field", label: "フィールド"},
        {value: "event", label: "イベント"},
    ];

    return (
        <div className="w-[25%]">
            <h2>カード検索</h2>

            <div>
                <div>
                    <label>カード名</label>
                    <input
                        type="text"
                        value={conditions.name}
                        onChange={(e) =>
                            onChange({
                                ...conditions,
                                name: e.target.value,
                            })
                        }
                        placeholder="カード名を検索"
                    />
                </div>

                <div>
                    <p>カードの色</p>

                    {colorOptions.map((color) => (
                        <label key={color.value}>
                            <input 
                                type="checkbox" 
                                checked={conditions.colors.includes(color.value)}
                                onChange={(e) => {
                                    onChange({
                                        ...conditions,
                                        colors: e.target.checked
                                            ? [...conditions.colors, color.value]
                                            : conditions.colors.filter(
                                                (value) => value !== color.value
                                              ),
                                    });
                                }}
                            />
                            {color.label}
                        </label>
                    ))}
                </div>

                <div>
                    <p>カードタイプ</p>

                    {typeOptions.map((type) => (
                        <label key={type.value}>
                            <input 
                                type="checkbox" 
                                checked={conditions.types.includes(type.value)}
                                onChange={(e) => {
                                    onChange({
                                        ...conditions,
                                        types: e.target.checked
                                            ? [...conditions.types, type.value]
                                            : conditions.types.filter(
                                                (value) => value !== type.value
                                              ),
                                    });
                                }}
                            />
                            {type.label}
                        </label>
                    ))}
                </div>

                <div>
                    <p>必要エナジー</p>

                    <input 
                        type="number"
                        value={conditions.minCost ?? ""}
                        onChange={(e) => {
                            onChange({
                                ...conditions,
                                minCost: Number(e.target.value),
                            });
                        }}
                    />
                    <p>～</p>
                    <input 
                        type="number"
                        value={conditions.maxCost ?? ""}
                        onChange={(e) => {
                            onChange({
                                ...conditions,
                                maxCost: Number(e.target.value),
                            });
                        }}
                    />
                </div>

                <div>
                    <p>発生エナジー</p>

                    <input 
                        type="number"
                        value={conditions.minEnergy ?? ""}
                        onChange={(e) => {
                            onChange({
                                ...conditions,
                                minEnergy: Number(e.target.value),
                            });
                        }}
                    />
                    <p>～</p>
                    <input 
                        type="number"
                        value={conditions.maxEnergy ?? ""}
                        onChange={(e) => {
                            onChange({
                                ...conditions,
                                maxEnergy: Number(e.target.value),
                            });
                        }}
                    />
                </div>

                <div>
                    <p>BP</p>

                    <input 
                        type="number"
                        value={conditions.minBp ?? ""}
                        onChange={(e) => {
                            onChange({
                                ...conditions,
                                minBp: Number(e.target.value),
                            });
                        }}
                    />
                    <p>～</p>
                    <input 
                        type="number"
                        value={conditions.maxBp ?? ""}
                        onChange={(e) => {
                            onChange({
                                ...conditions,
                                maxBp: Number(e.target.value),
                            });
                        }}
                    />
                </div>

                <button type="button" onClick={onSearch}>検索</button>
            </div>
        </div>
    );
};
