import './ListaSuspensa.css'

interface ListaSuspensaProps {
    label: string;
    valor: string;
    obrigatorio: boolean;
    itens: string[];
    aoAlterado: (valor: string) => void;
}

const ListaSuspensa = ({ label, valor, obrigatorio, itens, aoAlterado }: ListaSuspensaProps) => {
    return (
        <div className='lista-suspensa'>
            <label>{label}</label>
            <select onChange={evento => aoAlterado(evento.target.value)} required={obrigatorio} value={valor}>
                <option value=""></option>
                {itens.map(item => {
                    return <option key={item}>{item}</option>
                })}
            </select>
        </div>
    )
}

export default ListaSuspensa