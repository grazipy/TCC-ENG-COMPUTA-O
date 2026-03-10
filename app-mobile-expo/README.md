# App Mobile (React Native + Expo)

App para monitoramento de barramentos com consumo da API Node.js via `fetch`.

## Telas
- Dashboard com status atual
- Histórico de leituras
- Gráfico de temperatura
- Detalhes do dispositivo

## Estrutura
- `src/services/api.js`: chamadas HTTP (`fetch`).
- `src/hooks/useDeviceData.js`: carga e refresh de status + leituras.
- `src/screens/`: telas principais.
- `src/components/`: componentes reutilizáveis.
- `src/store/`, `src/navigation/`, `src/types/`, `src/utils/`: diretórios preparados para evolução.
- `assets/`: recursos estáticos.

## Como executar
```bash
npm install
npm start
```

> Ajuste a URL da API em `src/services/api.js` para o IP da sua máquina quando rodar em dispositivo físico.
