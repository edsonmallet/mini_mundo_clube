# mini_mundo_clube

## Teste Sinaf Mini Mundo Clube

## Modelo de dados

![modelo](/Model_Core.png)

Consiste em

1. Entidade Companies para cadastro das Empresas contratantes
2. Entidade Wallet são as carteiras de benefecios de cada empresa contratante, uma empresa pode ter mais de uma carteira
3. Entidade Beneficts são são os beneficios que podem ser adquiridos por cada carteira
4. Entidade Users são os usuários que podem adquirir os beneficios, cada usuario pertence a uma empresa e está associado a uma carteira dessa empresa.
5. Usuários podem ser associados a outros usuarios de acordo com o campo parentUuid preenchido.
6. Usuários dependentes só podem se cadastrar após o cadastro do usuario principal.
7. Usuários podem adquirir beneficios de acordo com o wallet que pertencem.
8. Usuários dependentes recebem o mesmo walletUuid do usuario principal.
9. Usuários podem ser bloqueados, editas, removidos e desbloqueados apenas pela empresa contratante que pertence.
