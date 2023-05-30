from Crypto.Cipher import AES, Twofish
from Crypto.Random import get_random_bytes
from Crypto.Util.Padding import pad, unpad

# AES encryption and decryption functions
def aes_encrypt(key, data):
    cipher = AES.new(key, AES.MODE_ECB)
    ciphertext = cipher.encrypt(pad(data, AES.block_size))
    return ciphertext

def aes_decrypt(key, ciphertext):
    cipher = AES.new(key, AES.MODE_ECB)
    decrypted = cipher.decrypt(ciphertext)
    return unpad(decrypted, AES.block_size)

# Twofish encryption and decryption functions
def twofish_encrypt(key, data):
    cipher = Twofish.new(key)
    ciphertext = cipher.encrypt(pad(data, Twofish.block_size))
    return ciphertext

def twofish_decrypt(key, ciphertext):
    cipher = Twofish.new(key)
    decrypted = cipher.decrypt(ciphertext)
    return unpad(decrypted, Twofish.block_size)

# Hybrid encryption function
def hybrid_encrypt(aes_key, twofish_key, data):
    encrypted_aes = aes_encrypt(aes_key, data)
    encrypted_twofish = twofish_encrypt(twofish_key, encrypted_aes)
    return encrypted_twofish

# Hybrid decryption function
def hybrid_decrypt(aes_key, twofish_key, ciphertext):
    decrypted_twofish = twofish_decrypt(twofish_key, ciphertext)
    decrypted_aes = aes_decrypt(aes_key, decrypted_twofish)
    return decrypted_aes

# Example usage
plaintext = b'This is the plaintext message'

# Generate AES and Twofish keys
aes_key = get_random_bytes(16)  # 128-bit AES key
twofish_key = get_random_bytes(32)  # 256-bit Twofish key

# Encryption
encrypted_data = hybrid_encrypt(aes_key, twofish_key, plaintext)
print("Encrypted Data:", encrypted_data.hex())

# Decryption
decrypted_data = hybrid_decrypt(aes_key, twofish_key, encrypted_data)
print("Decrypted Data:", decrypted_data.decode())
