import Swal from 'sweetalert2'

export const showSuccess = (title = 'Success', text = '') => {
  Swal.fire({
    icon: 'success',
    title,
    text,
    timer: 2000,
    showConfirmButton: false,
  })
}

export const showError = (title = 'Oops...', text = 'Terjadi kesalahan') => {
  Swal.fire({
    icon: 'error',
    title,
    text,
  })
}

export const showConfirm = async (text = 'Kamu yakin?', confirmButtonText = 'Ya') => {
  const result = await Swal.fire({
    icon: 'warning',
    title: 'Konfirmasi',
    text,
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#6c757d',
    confirmButtonText,
    cancelButtonText: 'Batal',
  })
  return result.isConfirmed
}
