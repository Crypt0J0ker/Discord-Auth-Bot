## 1. Создание бота в Discord

1. Зайдите в Discord Developers Portal.
2. Создайте New Application.
3. Зайдите на вкладку OAUTH2.
4. Скопируйте значение Client ID.
5. Скопируйте значение Client Secret (сделайте Reset).
6. Заполните поле Redirects, указав адрес для callback.
7. Нажмите Save.
8. Выберите необходимые поля в **OAuth2 URL Generator**. (В примере было выбрано только identify)
9. В поле **SELECT REDIRECT URL** нажмите на раскрывающийся список и выберите свой callback.
10. Скопируйте сгенерированую ссылку в поле GENERATED URL.

## 2. Возвращаемое значение при выборе только позиции identify при настройке бота авторизации

```js
req.user from callback: {
  id: '920744132689924156',
  username: 'crypto_j0ker',
  avatar: '8c7c0a74920a4a1c6419e182e16c55aa',
  discriminator: '0',
  public_flags: 0,
  flags: 0,
  banner: null,
  accent_color: null,
  global_name: 'CryptoJoker',
  avatar_decoration_data: null,
  banner_color: null,
  clan: null,
  mfa_enabled: false,
  locale: 'ru',
  premium_type: 0,
  provider: 'discord',
  accessToken: 'DCrj4p2Bxl4y7k6Pq9uRPz8r888B4k',
  fetchedAt: 2024-05-24T00:00:00.164Z
}
```
также можно получить дополнительные свойства указав их при настройке бота.

### 3. Примечание

В коде использован **localtunnel**, который создает https адрес, так как для авторизации в Discord необходимо использовать callback, а ему нужен только https адрес. На обычном сервере этого не требуется.